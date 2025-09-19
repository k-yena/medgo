// --- DOM 요소 참조 // DOM이 로드된 후 할당될 변수들
let mainAppScreen,
  bottomPanel,
  searchInput,
  searchResultsContainer,
  mapPlaceholder,
  homeButton,
  panelTitle,
  searchBox,
  searchBackButton,
  mapControlsContainer,
  capsuleStripContainer,
  capsuleStrip;

// --- 전역 상태 변수 ---
let map; // 카카오 지도 인스턴스
let markers = []; // 모든 지도 마커를 저장하는 배열
let selectedMarker = null; // 현재 선택된 마커
let currentSearchedDrug = null; // 현재 검색된 약품
let userLocationMarker = null; // 사용자 위치 마커

// API를 통해 동적으로 채워질 pharmacyDatabase
let pharmacyDatabase = {};

// --- 목업 데이터 (drugDatabase와 alternativesDatabase는 일단 유지) ---
//TODO: 카테고리 정리 진통제, 소화제, 영양제, 어린이 약....
//대체약..
const drugDatabase = {
  진통소염제: {
    icon: "bi bi-bandaid",
    color: "#ffbe0b",
    drugs: [
      "타이레놀정 500mg",
      "어린이용 타이레놀정 80mg",
      "타이레놀 콜드-에스정",
      "게보린정",
      "게보린 릴랙스 연질캡슐",
      "펜잘큐정",
      "펜잘이알서방정",
      "부루펜정 400mg",
      "어린이 부루펜 시럽",
      "탁센 400 이부프로펜",
      "탁센 덱시",
      "이지엔6 애니",
      "이지엔6 프로",
    ],
  },
  소화제: {
    icon: "bi bi-heart-pulse",
    color: "#8338ec",
    drugs: ["훼스탈 플러스정", "훼스탈 골드정", "닥터베아제", "베아제정"],
  },
  알레르기약: {
    icon: "bi bi-wind",
    color: "#3a86ff",
    drugs: ["지르텍정", "클라리틴정", "어린이 클라리틴 시럽"],
  },
  상처치료: {
    icon: "bi bi-file-earmark-medical",
    color: "#ff006e",
    drugs: ["마데카솔케어 연고", "마데카솔 분말", "후시딘 연고", "후시딘 밴드"],
  },
  잇몸약: {
    icon: "bi bi-emoji-smile",
    color: "#fb5607",
    drugs: ["인사돌플러스정", "이가탄에프캡슐"],
  },
};
// 대체약 정보
const alternativesDatabase = {
  "타이레놀정 500mg": ["게보린정", "펜잘큐정", "부루펜정 400mg"],
  게보린정: ["타이레놀정 500mg", "펜잘큐정", "이지엔6 애니"],
  "훼스탈 플러스정": ["훼스탈 골드정", "닥터베아제", "베아제정"],
  지르텍정: ["클라리틴정", "어린이 클라리틴 시럽"],
  "마데카솔케어 연고": ["후시딘 연고", "마데카솔 분말"],
};

// --- API 호출 함수 ---

// 주변 약국 목록을 서버에서 가져오기
async function fetchNearbyPharmacies(lat, lon, keyword = false) {
  let url;
  if (keyword) {
    url = `${contextPath}/api/nearby?latitude=${lat}&longitude=${lon}&keyword=${keyword}`;
  } else {
    url = `${contextPath}/api/nearby?latitude=${lat}&longitude=${lon}`;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("주변 약국 정보를 가져오는 데 실패했습니다:", error);
    return []; // 오류 발생 시 빈 배열을 반환
  }
}

async function fetchNotice(pharmacyId) {
  console.log(pharmacyId, "pharmacyId");
  const url = `${contextPath}/api/nearby/${pharmacyId}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return await data.content; // 공지사항은 텍스트로 처리
  } catch (error) {
    return "공지사항을 불러올 수 없습니다."; // 오류 발생 시 기본 메시지 반환
  }
}

// --- 데이터 처리 함수 ---

// API 응답(약국 배열)을 기존 코드에서 사용하는 객체 형태로 변환합니다.

function processPharmacyData(pharmacies) {
  const db = {};
  pharmacies.forEach((pharmacy) => {
    db[pharmacy.pharmacyName] = {
      id: pharmacy.id,
      address: pharmacy.address,
      phone: pharmacy.phone,
      latlng: new kakao.maps.LatLng(pharmacy.latitude, pharmacy.longitude),
      distance: `${pharmacy.distance.toFixed(1)}m`,
      drugs: drugDatabase,
      info: "//",
    };
  });
  return db;
}

// --- 앱 초기화 ---

// DOM 요소 변수를 초기화하는 함수
function initializeDOMElements() {
  mainAppScreen = document.getElementById("main-app-screen");
  bottomPanel = document.querySelector(".bottom-panel");
  searchInput = document.querySelector(".search-box input");
  searchResultsContainer = document.getElementById("search-results-container");
  mapPlaceholder = document.getElementById("map-placeholder");
  homeButton = document.querySelector(".home-button");
  panelTitle = document.querySelector(".panel-title");
  searchBox = document.querySelector(".search-box");
  searchBackButton = document.getElementById("search-back-button");
  mapControlsContainer = document.getElementById("map-controls-container");
  capsuleStripContainer = document.getElementById("capsule-strip-container");
  capsuleStrip = document.getElementById("capsule-strip");
}

// 이벤트 리스너를 등록하는 함수
function initializeEventListeners() {
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedSearch = debounce((searchTerm) => {
    if (searchTerm.length > 0) {
      fetch(`${contextPath}/api/search/${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          displaySearchResults({ drugList: data });
        })
        .catch((error) => console.error("Error:", error));
    } else {
      searchResultsContainer.innerHTML = "";
    }
  }, 500);

  // 검색창 이벤트
  searchInput.addEventListener("focus", () => {
    resetAllMarkers();
    mainSearchBoxDisplay();
    searchBackButton.className = "bi bi-chevron-left";
    searchBackButton.onclick = goHome;
    displaySearchResults({ query: searchInput.value });
  });
  let isImeComposing = false;

  searchInput.addEventListener("compositionstart", () => {
    isImeComposing = true;
  });

  searchInput.addEventListener("compositionend", (e) => {
    isImeComposing = false;
    debouncedSearch(e.target.value);
  });

  // 검색창에 입력할 때마다 API를 호출하여 약품 목록을 가져옵니다.
  searchInput.addEventListener("input", (e) => {
    if (isImeComposing) {
      return;
    }
    debouncedSearch(e.target.value);
  });
  // 하단 패널 이벤트
  bottomPanel.addEventListener("click", (event) => {
    if (
      event.target === bottomPanel ||
      event.target.classList.contains("panel-handle")
    ) {
      bottomPanel.classList.toggle("active");
    }
  });

  // 하단 패널 약국 목록 클릭 이벤트
  document
    .querySelector(".bottom-panel .pharmacy-list")
    .addEventListener("click", function (event) {
      const listItem = event.target.closest(".pharmacy-item");
      if (!listItem) return;

      const pharmacyId = parseInt(listItem.dataset.pharmacyId);
      const targetMarker = markers.find(
        (marker) => marker.pharmacyId === pharmacyId
      );

      if (targetMarker) {
        map.panTo(targetMarker.getPosition());
        selectMarkerById(pharmacyId);
      }
    });

  // 뱃지 스트립 드래그 스크롤 이벤트
  let isDown = false;
  let startX;
  let scrollLeft;
  capsuleStrip.addEventListener("mousedown", (e) => {
    isDown = true;
    capsuleStrip.classList.add("active");
    startX = e.pageX - capsuleStrip.offsetLeft;
    scrollLeft = capsuleStrip.scrollLeft;
  });
  capsuleStrip.addEventListener("mouseleave", () => {
    isDown = false;
    capsuleStrip.classList.remove("active");
  });
  capsuleStrip.addEventListener("mouseup", () => {
    isDown = false;
    capsuleStrip.classList.remove("active");
  });
  capsuleStrip.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - capsuleStrip.offsetLeft;
    const walk = (x - startX) * 2;
    capsuleStrip.scrollLeft = scrollLeft - walk;
  });
}

// 앱 시작점
window.onload = () => {
  initializeDOMElements();
  initializeEventListeners();

  if (!mapPlaceholder) {
    console.error(
      "지도 컨테이너 '#map-placeholder'를 찾을 수 없습니다. HTML을 확인해주세요."
    );
    return;
  }

  const startApp = (lat, lon) => {
    fetchNearbyPharmacies(lat, lon).then((pharmacies) => {
      console.log(pharmacies);
      pharmacyDatabase = processPharmacyData(pharmacies);
      initializeMap();
      goHome();
      populateCapsuleStrip();
    });
  };

  navigator.geolocation.getCurrentPosition(
    (position) => {
      startApp(position.coords.latitude, position.coords.longitude);
    },
    (error) => {
      console.error("Geolocation error:", error);
      startApp(37.5665, 126.978); // 서울 시청 기준
    }
  );
};

// --- 지도 관련 함수 ---

function centerMapOnUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const userLocation = new kakao.maps.LatLng(lat, lon);
          const currentImg =
            contextPath + "/resources/dist/assets/images/myLoc.svg";
          const currentImgSize = new kakao.maps.Size(30, 30);
          const currentMarkerImage = new kakao.maps.MarkerImage(
            currentImg,
            currentImgSize
          );

          if (userLocationMarker) {
            userLocationMarker.setPosition(userLocation);
          } else {
            userLocationMarker = new kakao.maps.Marker({
              position: userLocation,
              map: map,
              image: currentMarkerImage,
            });
          }
          map.setLevel(1);
          map.setCenter(userLocation);
          map.panBy(0, 50);

          console.log(lat, lon, "유저 좌표");
          resolve({ lat, lon }); // Promise가 성공하면 위치 정보 객체를 반환합니다.
        },
        (error) => {
          console.error("Geolocation error:", error);
          reject(error); // 오류 발생 시 Promise를 실패 처리합니다.
        }
      );
    } else {
      const errorMsg = "Geolocation is not supported by this browser.";
      console.error(errorMsg);
      reject(errorMsg); // Geolocation을 지원하지 않을 경우 Promise를 실패 처리합니다.
    }
  });
}

function resetAllMarkers() {
  const normalImg = contextPath + "/resources/dist/assets/images/markerS.svg";
  const normalImgSize = new kakao.maps.Size(40, 40);
  const normalMarkerImage = new kakao.maps.MarkerImage(
    normalImg,
    normalImgSize
  );
  for (const marker of markers) {
    marker.setImage(normalMarkerImage);
  }
  selectedMarker = null;
}

function selectMarkerById(pharmacyId) {
  const targetMarker = markers.find(
    (marker) => marker.pharmacyId === pharmacyId
  );
  if (!targetMarker) return;

  if (selectedMarker && selectedMarker !== targetMarker) {
    const normalImg = contextPath + "/resources/dist/assets/images/markerS.svg";
    const normalImgSize = new kakao.maps.Size(40, 40);
    selectedMarker.setImage(
      new kakao.maps.MarkerImage(normalImg, normalImgSize)
    );
  }

  const clickImg = contextPath + "/resources/dist/assets/images/markerL.svg";
  const clickImgSize = new kakao.maps.Size(80, 80);
  targetMarker.setImage(new kakao.maps.MarkerImage(clickImg, clickImgSize));
  selectedMarker = targetMarker;

  map.setLevel(1);
  map.setCenter(targetMarker.getPosition());
  map.panBy(0, 50);
}

function initializeMap() {
  var mapContainer = document.getElementById("map-placeholder");
  var mapOption = {
    center: new kakao.maps.LatLng(37.583802, 126.999801),
    level: 1,
  };
  map = new kakao.maps.Map(mapContainer, mapOption);

  var normalImg = contextPath + "/resources/dist/assets/images/markerS.svg";
  var normalImgSize = new kakao.maps.Size(40, 40);
  var clickImg = contextPath + "/resources/dist/assets/images/markerL.svg";
  var clickImgSize = new kakao.maps.Size(80, 80);

  for (const pharmacyName in pharmacyDatabase) {
    const pharmacy = pharmacyDatabase[pharmacyName];
    if (pharmacy.latlng) {
      var markerImage = new kakao.maps.MarkerImage(normalImg, normalImgSize);
      var clickImage = new kakao.maps.MarkerImage(clickImg, clickImgSize);

      var marker = new kakao.maps.Marker({
        map: map,
        position: pharmacy.latlng,
        title: pharmacyName,
        image: new kakao.maps.MarkerImage(
          contextPath + "/resources/dist/assets/images/markerS.svg",
          new kakao.maps.Size(40, 40)
        ),
      });

      marker.pharmacyId = pharmacy.id;
      markers.push(marker);

      kakao.maps.event.addListener(
        marker,
        "click",
        ((m, clickImg) => {
          return function () {
            if (selectedMarker && selectedMarker !== m) {
              selectedMarker.setImage(
                new kakao.maps.MarkerImage(normalImg, normalImgSize)
              );
            }
            m.setImage(clickImg);
            selectedMarker = m;

            const pharmacyId = m.pharmacyId;
            let pharmacyName = null;
            let pharmacyData = null;
            for (const name in pharmacyDatabase) {
              if (pharmacyDatabase[name].id === pharmacyId) {
                pharmacyName = name;
                pharmacyData = pharmacyDatabase[name];
                break;
              }
            }

            if (!pharmacyName) {
              console.error(
                "ID에 해당하는 약국을 찾을 수 없습니다:",
                pharmacyId
              );
              return;
            }

            let stock = "이게 왜 여기서?";
            let drugNameToShow = null;
            if (currentSearchedDrug) {
              if (
                pharmacyData &&
                pharmacyData.drugs &&
                pharmacyData.drugs[currentSearchedDrug]
              ) {
                stock = pharmacyData.drugs[currentSearchedDrug];
                drugNameToShow = currentSearchedDrug;
              }
            }

            showPharmacyDetailsInPanel(pharmacyName, stock, drugNameToShow);

            map.setLevel(1);
            map.setCenter(m.getPosition());
            map.panBy(0, 50);
          };
        })(marker, clickImage)
      );
    }
  }

  kakao.maps.event.addListener(map, "click", function (mouseEvent) {
    resetAllMarkers();
  });
}

// --- UI 구성 요소 생성 ---

function mainSearchBoxDisplay() {
  mapControlsContainer.style.display = "none";
  capsuleStripContainer.style.display = "none";
  searchBox.style.border = "none";
  searchBox.style.boxShadow = "none";
  bottomPanel.style.display = "none";
  mapPlaceholder.style.display = "none";
  searchResultsContainer.style.display = "block";
  searchResultsContainer.style.paddingTop = "80px";
}

function populateCapsuleStrip() {
  const categories = Object.keys(drugDatabase);
  capsuleStrip.innerHTML = "";
  categories.forEach((category) => {
    const capsule = document.createElement("div");
    capsule.className = "badge rounded-pill text-bg-light capsule-item";
    const icon = document.createElement("i");
    icon.className = drugDatabase[category].icon + " me-2";
    icon.style.color = drugDatabase[category].color;
    const text = document.createElement("span");
    text.textContent = category;
    capsule.appendChild(icon);
    capsule.appendChild(text);
    capsule.onclick = () => filterByCapsule(category);
    capsuleStrip.appendChild(capsule);
  });
}

function filterByCapsule(category) {
  resetAllMarkers();
  mainSearchBoxDisplay();
  searchBackButton.className = "bi bi-chevron-left";
  searchBackButton.onclick = goHome;
  const drugList = drugDatabase[category].drugs;
  displaySearchResults({ drugList: drugList });
}

// --- 화면 상태 변경 함수 ---

function displaySearchResults({ query, drugList = null }) {
  searchResultsContainer.innerHTML = "";

  // If there's no pre-defined drug list and the query is empty, do nothing.
  if (!drugList && (!query || query.trim().length === 0)) {
    return;
  }

  let results = [];

  if (drugList) {
    results = drugList;
  } else {
    const lowerCaseQuery = query.toLowerCase().trim();
    for (const category in drugDatabase) {
      if (category.toLowerCase().includes(lowerCaseQuery)) {
        results.push(...drugDatabase[category].drugs);
      } else {
        drugDatabase[category].drugs.forEach((drugName) => {
          if (drugName.toLowerCase().includes(lowerCaseQuery)) {
            if (!results.includes(drugName)) {
              results.push(drugName);
            }
          }
        });
      }
    }
  }

  results = [...new Set(results)];

  if (results.length > 0) {
    results.forEach((drugName) => {
      const item = document.createElement("div");
      item.className = "search-result-item";
      item.textContent = drugName;
      item.onclick = () => {
        searchInput.value = drugName;
        updateMainScreenForDrug(drugName);
      };
      searchResultsContainer.appendChild(item);
    });
  } else {
    searchResultsContainer.innerHTML = `<p style=\"text-align: center; color: #888; padding: 20px;\">목록이 없습니다.</p>`;
  }
}

function goHome() {
  resetAllMarkers();
  currentSearchedDrug = null;
  mapControlsContainer.style.display = "flex";
  mapControlsContainer.style.top = "8em";
  capsuleStripContainer.style.display = "block";
  capsuleStripContainer.style.top = "4.5em";
  bottomPanel.style.display = "flex";
  homeButton.style.display = "none";
  searchBackButton.style.display = "block";
  searchBackButton.className = "bi bi-capsule-pill";
  searchBackButton.onclick = null;
  mapPlaceholder.style.display = "block";
  searchResultsContainer.style.display = "none";
  searchBox.style.display = "flex";
  searchBox.style.border = "1px solid #ddd";
  searchBox.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
  searchInput.value = "";
  for (const marker of markers) {
    marker.setVisible(true);
  }
  populateMainPharmacyList();
  document.querySelector(".alt-search-btn").style.display = "none";
  panelTitle.style.display = "block";
  centerMapOnUserLocation();
}

//약을 가진 약국 뿌리기
async function updateMainScreenForDrug(drugName) {
  currentSearchedDrug = drugName;
  mapControlsContainer.style.display = "flex";
  mapControlsContainer.style.top = "8em";
  capsuleStripContainer.style.display = "block";
  capsuleStripContainer.style.top = "4.5em";
  bottomPanel.style.display = "flex";
  searchResultsContainer.style.display = "none";
  mapPlaceholder.style.display = "block";
  panelTitle.style.display = "none";
  searchBox.style.display = "flex";
  searchBox.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
  homeButton.style.display = "none";
  searchInput.value = drugName;
  searchBackButton.style.display = "block";
  searchBackButton.className = "bi bi-chevron-left";
  searchBackButton.onclick = goHome;
  document.querySelector(".alt-search-btn").style.display = "block";

  const { lat, lon } = await centerMapOnUserLocation();
  const pharmaciesData = await fetchNearbyPharmacies(lat, lon, drugName);

  console.log("약 검색 후 약국 목록:", pharmaciesData);

  const pharmacyList = document.querySelector(".bottom-panel .pharmacy-list");
  pharmacyList.innerHTML = "";
  let found = false;
  // address;

  // ("서울 종로구 창경궁로 254 402호");
  // distance: 27.685668936830545;
  // id: 1;
  // latitude: 37.5838574;
  // longitude: 126.9999455;
  // medCount: 4;
  // pharmacyName: "오티아이";
  // phone: "01012341234";
  for (const pharmacy of pharmaciesData) {
    found = true;
    const item = document.createElement("div");
    item.className = "pharmacy-item";
    item.dataset.pharmacyId = pharmacy.id;
    item.onclick = () =>
      showPharmacyDetailsInPanel(
        pharmacy.pharmacyName,
        pharmacy.medCount,
        drugName
      );
    item.innerHTML = `<h3>${
      pharmacy.pharmacyName
    }</h3><span>${pharmacy.distance.toFixed(1)}m</span>`;
    pharmacyList.appendChild(item);
  }

  if (!found) {
    pharmacyList.innerHTML = `<p style="text-align: center; color: #888; padding-top: 20px;">재고를 보유한 약국이 없습니다.</p>`;
  }

  const pharmaciesWithDrug = new Set(pharmaciesData.map((p) => p.pharmacyName));
  for (const marker of markers) {
    const pharmacyName = marker.getTitle();
    if (pharmaciesWithDrug.has(pharmacyName)) {
      marker.setVisible(true);
    } else {
      marker.setVisible(false);
    }
  }
  centerMapOnUserLocation();
}

function showAlternatives() {
  if (!currentSearchedDrug) return;
  bottomPanel.style.display = "none";
  mapControlsContainer.style.display = "none";
  capsuleStripContainer.style.display = "none";
  mapPlaceholder.style.display = "none";
  searchResultsContainer.style.display = "block";
  searchBox.style.display = "flex";
  let drugList = alternativesDatabase[currentSearchedDrug] || [];
  searchBackButton.className = "bi bi-chevron-left";
  searchBackButton.onclick = () => updateMainScreenForDrug(currentSearchedDrug);
  displaySearchResults({ drugList: drugList });
}

function populateMainPharmacyList() {
  const mainList = document.querySelector(".bottom-panel .pharmacy-list");
  mainList.innerHTML = "";
  for (const pharmacyName in pharmacyDatabase) {
    const pharmacy = pharmacyDatabase[pharmacyName];
    const item = document.createElement("div");
    item.className = "pharmacy-item";
    item.dataset.pharmacyId = pharmacy.id;
    item.onclick = (e) => {
      showPharmacyDetailsInPanel(pharmacyName, "정보 보기", null);
    };
    item.innerHTML = `<h3>${pharmacyName}</h3><span>${pharmacy.distance}</span>`;
    mainList.appendChild(item);
  }
}

async function showPharmacyDetailsInPanel(name, stock, drugName) {
  const pharmacyList = bottomPanel.querySelector(".pharmacy-list");
  pharmacyList.innerHTML =
    "<div style='text-align:center; padding: 20px;'>로딩 중...</div>";
  document.querySelector(".alt-search-btn").style.display = "none";
  panelTitle.style.display = "none";

  const pharmacy = pharmacyDatabase[name];
  if (!pharmacy) return;

  // API를 통해 공지사항을 비동기적으로 가져옵니다.
  const notice = await fetchNotice(pharmacy.id);

  const detailView = document.createElement("div");
  detailView.className = "pharmacy-detail-content";

  const backFunction = drugName
    ? `updateMainScreenForDrug('${drugName.replace(/'/g, "'")}')`
    : "goHome()";
  console.log(stock, "stock");
  let stockBadge = "";
  let stockTag;
  if (drugName) {
    let badgeColor = "text-bg-secondary";
    if (100 <= stock) {
      stockTag = "많음";
      badgeColor = "text-bg-success";
    }
    if (50 < stock && stock < 100) {
      stockTag = "보통";
      badgeColor = "text-bg-warning";
    }

    if (stock <= 50) {
      stockTag = "적음";
      badgeColor = "text-bg-danger";
    }
    stockBadge = `<span class=\"badge ${badgeColor} ms-2\">${stockTag}</span>`;
  }

  detailView.innerHTML = `
    <h2 style=\"10px auto 20px auto;\">${name}${stockBadge}</h2>
    <p><i class=\"bi bi-telephone me-2\"></i> ${
      pharmacy.phone || "정보 없음"
    }</p>
    <p><i class=\"bi bi-capsule me-2\"> </i> ${pharmacy.info || "정보 없음"}</p>
    <p><i class=\"bi bi-megaphone me-2\"></i> ${notice || "정보 없음"}</p>
    <div class=\"d-flex justify-content-center mt-2 sticky-bottom-btn-container\">
      <span class=\"list-badge badge text-bg-light shadow-sm\" onclick=\"${backFunction}\">
        <i class=\"bi bi-list-task me-2\"></i>목록 보기
      </span>
    </div>
  `;

  pharmacyList.innerHTML = ""; // 로딩 메시지 제거
  pharmacyList.appendChild(detailView);
  bottomPanel.classList.add("active");
}
