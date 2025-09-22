// --- DOM 요소 참조 ---
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

// --- 정적 데이터 ---
let pharmacyDatabase = {}; // 약국 정보
let drugDatabase = {}; // 약품 정보
// 카테고리별 약품 목록
const drugDatabaseForCategory = {
  진통제: {
    icon: "bi bi-bandaid",
    color: "#ffbe0b",
    drugs: [
      { 이지엔6: "이지엔6애니연질캡슐(이부프로펜)" },
      { 타이레놀500mg: "타이레놀정500밀리그람(아세트아미노펜)" },
      { 탁센: "탁센연질캡슐(나프록센)" },
      { 프리엔: "프리엔연질캡슐(덱시부프로펜)" },
      { 트리스펜: "트리스펜연질캡슐(이부프로펜)" },
      { 페인엔젤센: "페인엔젤센연질캡슐(나프록센)" },
      { 확펜: "확펜연질캡슐(나프록센)" },
    ],
  },
  소화제: {
    icon: "bi bi-heart-pulse",
    color: "#8338ec",
    drugs: [
      { 배아제: "베아제정" },
      { 닥터배아제: "닥터베아제정" },
      { 훼스탈플러스: "훼스탈플러스정" },
      { 훼스탈골드: "훼스탈골드정" },
      { 다제스: "다제스캡슐" },
      { 스피자임: "스피자임정" },
      { 까스활명수: "까스활명수" },
      { 배나치오: "베나치오액" },
      { 속청: "속청액" },
      { 알마겔에프: "알마겔에프정(알마게이트)" },
      { 겔포스엠: "겔포스엠현탁액" },
      { 개비스콘더블액션: "개비스콘더블액션현탁액" },
      { 위생단Q: "위생단큐환" },
    ],
  },
  알레르기약: {
    icon: "bi bi-wind",
    color: "#3a86ff",
    drugs: [
      { 지르텍: "지르텍정(세티리진염산염)" },
      { 코스펜: "코스펜정" },
      { 알레그라120mg: "알레그라정120밀리그람(펙소페나딘염산염)" },
      { 코메키나: "코메키나캡슐" },
      { 클라리틴: "클라리틴정(로라타딘)" },
      { 알러샷: "알러샷연질캡슐(세티리진염산염)" },
      { 플로라딘: "플로라딘연질캡슐(로라타딘)" },
      { 클리어딘: "클리어딘연질캡슐(로라타딘)" },
      { 알로스탑: "알로스탑연질캡슐(로라타딘)" },
      { 알러젯: "알러젯연질캡슐(펙소페나딘염산염)" },
      { 쿨노즈: "쿨노즈캡슐" },
    ],
  },
  종합감기약: {
    icon: "bi bi bi-virus2",
    color: "#ff006e",
    drugs: [
      { 콜대원: "콜대원콜드에스시럽" },
      { 에키나포스프로텍트: "에키나포스프로텍트정" },
      { 모드콜에스: "모드콜에스연질캡슐" },
      { 화이투벤플러스: "화이투벤플러스캡슐" },
      { 코스펜: "코스펜정" },
      { 판콜에스: "판콜에스내복액" },
      { 하디큐콜드: "하디큐콜드연질캡슐" },
      { 갈근탕: "감치원캅셀(갈근탕)" },
      { 콘택골드: "콘택골드캡슐" },
      { 판피린: "판피린정" },
    ],
  },
  상처연고: {
    icon: "bi bi-bandaid",
    color: "#13b138ff",
    drugs: [
      { 에스로반: "에스로반연고(무피로신)" },
      { 애크논: "애크논크림" },
      { 비판텐: "비판텐연고(덱스판테놀)" },
      { 삼아리도멕스로션: "삼아리도멕스로션(프레드니솔론발레로아세테이트)" },
      { 노스카나: "노스카나겔" },
      { 바스포: "바스포연고" },
      { 태극아즈렌에스: "태극아즈렌에스연고(구아야줄렌)" },
      { 버물리알파: "버물리알파액" },
      { 마데카솔케어: "마데카솔케어연고" },
      { 후시딘: "후시딘연고(퓨시드산나트륨)" },
      { 베아로반: "베아로반연고(무피로신)" },
    ],
  },
  어린이: {
    icon: "bi bi-emoji-smile",
    color: "#e59524ff",
    drugs: [
      { 맥시부키즈: "맥시부키즈시럽(덱시부프로펜)" },
      { 세노바: "세노바액(세티리진염산염)" },
      { 챔프이부펜: "챔프이부펜시럽(이부프로펜)" },
      { 콜대원키즈: "콜대원키즈이부펜시럽(이부프로펜)" },
      { 어린이부루펜: "어린이부루펜시럽(이부프로펜)" },
      { 그린콜샷에스: "그린콜샷에스시럽" },
      { 백초시럽플러스: "백초시럽플러스" },
      { 꼬마활명수액: "꼬마활명수액" },
      { 텐텐츄정: "텐텐츄정" },
      { 어린이타이레놀: "어린이타이레놀현탁액(아세트아미노펜)" },
      { 소보민시럽: "소보민시럽(소아용)" },
      { 엄마손시럽: "엄마손시럽" },
    ],
  },
};

// --- API 호출 함수 ---

// 주변 약국 목록을 서버에서 가져오는 함수
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
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("주변 약국 정보를 가져오는 데 실패했습니다:", error);
    return [];
  }
}

// 특정 약국의 공지사항을 가져오는 함수
async function fetchNotice(pharmacyId) {
  const url = `${contextPath}/api/nearby/${pharmacyId}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return await data.content;
  } catch (error) {
    return "공지사항을 불러올 수 없습니다.";
  }
}

// --- 데이터 처리 함수 ---

// API 응답(약국 배열)을 내부에서 사용하는 객체 형태로 변환하는 함수
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
  // 디바운스 함수 (과도한 이벤트 발생 방지)
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // 디바운스가 적용된 약품 검색 함수
  const debouncedSearch = debounce((searchTerm) => {
    if (searchTerm.length > 0) {
      fetch(`${contextPath}/api/search/${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          displaySearchResults({ drugList: data });
        })
        .catch((error) => console.error("Error:", error));
    } else {
      searchResultsContainer.innerHTML = "";
    }
  }, 500);

  // 검색창 포커스 이벤트
  searchInput.addEventListener("focus", () => {
    resetAllMarkers();
    mainSearchBoxDisplay();
    searchBackButton.className = "bi bi-chevron-left";
    searchBackButton.onclick = goHome;
    displaySearchResults({ query: searchInput.value });
  });

  // 한글 입력 이슈 해결을 위한 IME composition 이벤트 처리
  let isImeComposing = false;
  searchInput.addEventListener("compositionstart", () => {
    isImeComposing = true;
  });
  searchInput.addEventListener("compositionend", (e) => {
    isImeComposing = false;
    debouncedSearch(e.target.value);
  });

  // 검색창 입력 이벤트
  searchInput.addEventListener("input", (e) => {
    if (isImeComposing) {
      return;
    }
    debouncedSearch(e.target.value);
  });

  // 하단 패널 확장/축소 이벤트
  bottomPanel.addEventListener("click", (event) => {
    if (
      event.target === bottomPanel ||
      event.target.classList.contains("panel-handle")
    ) {
      bottomPanel.classList.toggle("active");
    }
  });

  // 하단 패널의 약국 목록 클릭 이벤트
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

  // 카테고리 뱃지 스트립 드래그 스크롤 이벤트
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

window.onload = () => {
	  // 3초 후에 랜딩 스크린을 숨깁니다.
	  setTimeout(() => {
	    const landingScreen = document.getElementById('landing-screen');
	    if (landingScreen) {
	      // 부드럽게 사라지는 효과를 위해 opacity를 먼저 변경합니다.
	      landingScreen.style.opacity = '0';
	      // 애니메이션이 끝난 후 화면에서 완전히 제거합니다.
	      setTimeout(() => {
	        landingScreen.style.display = 'none';
	      }, 500); // CSS transition 시간과 일치시킵니다.
	    }
	  }, 3000);
  initializeDOMElements();
  initializeEventListeners();

  if (!mapPlaceholder) {
    console.error(
      "지도 컨테이너 '#map-placeholder'를 찾을 수 없습니다. HTML을 확인해주세요."
    );
    return;
  }

  // 앱 시작 함수
  const startApp = (lat, lon) => {
    fetchNearbyPharmacies(lat, lon).then((pharmacies) => {
      pharmacyDatabase = processPharmacyData(pharmacies);
      initializeMap();
      goHome();
      populateCapsuleStrip();
    });
  };

  // 사용자 위치 정보 가져오기
  navigator.geolocation.watchPosition(
    (position) => {
      startApp(position.coords.latitude, position.coords.longitude);
    },
    (error) => {
      console.error("Geolocation error:", error);
      startApp(37.5665, 126.978); // 위치 정보 실패 시 서울 시청 기준으로 시작
    }
  );
};

// --- 지도 관련 함수 ---

//사용자 현재 위치를 기준으로 지도를 중앙에 표시하는 함수
function centerMapOnUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      const errorMsg = "Geolocation is not supported by this browser.";
      console.error(errorMsg);
      reject(errorMsg);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const userLocation = new kakao.maps.LatLng(lat, lon);

        // 마커 이미지
        const currentImg =
          contextPath + "/resources/dist/assets/images/myLoc.svg";
        const currentImgSize = new kakao.maps.Size(30, 30);
        const currentMarkerImage = new kakao.maps.MarkerImage(
          currentImg,
          currentImgSize
        );

        // 마커 위치 갱신
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

        // 🔹 핵심: 좌표가 동일해도 강제로 맵 중앙 갱신
        const tinyOffset = 0.000001;
        map.setCenter(
          new kakao.maps.LatLng(lat + tinyOffset, lon + tinyOffset)
        );
        setTimeout(() => {
          map.setCenter(userLocation);
          map.panBy(0, 50);
        }, 50);

        resolve({ lat, lon });
      },
      (error) => {
        console.error("Geolocation error:", error);
        reject(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: Infinity, // 캐시된 좌표 사용 허용
      }
    );
  });
}

// 모든 마커를 기본 이미지로 초기화하는 함수
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

// 약국 ID로 특정 마커를 선택하고 강조하는 함수
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

// 카카오 지도를 초기화하고 마커를 생성하는 함수
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

      // 마커 클릭 이벤트 리스너
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
              return;
            }

            let stock = "";
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

  // 지도 클릭 시 모든 마커 초기화
  kakao.maps.event.addListener(map, "click", function (mouseEvent) {
    resetAllMarkers();
  });
}

// --- UI 구성 요소 생성 ---

// 메인 검색창 화면을 표시하는 함수
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

// 카테고리 캡슐 스트립을 생성하는 함수
function populateCapsuleStrip() {
  const categories = Object.keys(drugDatabaseForCategory);
  capsuleStrip.innerHTML = "";
  categories.forEach((category) => {
    const capsule = document.createElement("div");
    capsule.className = "badge rounded-pill text-bg-light capsule-item";
    const icon = document.createElement("i");
    icon.className = drugDatabaseForCategory[category].icon + " me-2";
    icon.style.color = drugDatabaseForCategory[category].color;
    const text = document.createElement("span");
    text.textContent = category;
    capsule.appendChild(icon);
    capsule.appendChild(text);
    capsule.onclick = () => filterByCapsule(category);
    capsuleStrip.appendChild(capsule);
  });
}

// 카테고리별 약품 목록을 필터링하여 보여주는 함수
function filterByCapsule(category) {
  resetAllMarkers();
  mainSearchBoxDisplay();
  searchBackButton.className = "bi bi-chevron-left";
  searchBackButton.onclick = goHome;

  const drugs = drugDatabaseForCategory[category].drugs;
  const displayNames = drugs.map((drug) => Object.keys(drug)[0]);
  const fetchNameMap = {};
  drugs.forEach((drug) => {
    const displayName = Object.keys(drug)[0];
    const fetchName = drug[displayName];
    fetchNameMap[displayName] = fetchName;
  });

  displaySearchResults({ drugList: displayNames });

  searchResultsContainer
    .querySelectorAll(".search-result-item")
    .forEach((item) => {
      item.onclick = async () => {
        const displayName = item.textContent;
        const fetchName = fetchNameMap[displayName];
        searchInput.value = displayName;
        await updateMainScreenForDrug(fetchName);
      };
    });
}

// --- 화면 상태 변경 함수 ---

// 검색 결과를 화면에 표시하는 함수
function displaySearchResults({ query, drugList = null }) {
  searchResultsContainer.innerHTML = "";
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
    searchResultsContainer.innerHTML = `<p style="text-align: center; color: #888; padding: 20px;">목록이 없습니다.</p>`;
  }
}

// 홈 화면(초기 화면)으로 돌아가는 함수
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

// 특정 약품을 보유한 약국 목록을 보여주는 메인 화면으로 업데이트하는 함수
async function updateMainScreenForDrug(drugName) {
  currentSearchedDrug = drugName;
  mapControlsContainer.style.display = "flex";
  mapControlsContainer.style.top = "8em";
  capsuleStripContainer.style.display = "none";
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
  const pharmacyList = document.querySelector(".bottom-panel .pharmacy-list");
  pharmacyList.innerHTML = "";
  let found = false;
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

// 대체 가능한 약품 목록을 보여주는 함수
async function showAlternatives() {
  if (!currentSearchedDrug) return;

  bottomPanel.style.display = "none";
  mapControlsContainer.style.display = "none";
  capsuleStripContainer.style.display = "none";
  mapPlaceholder.style.display = "none";
  searchResultsContainer.style.display = "block";
  searchBox.style.display = "flex";
  searchBackButton.className = "bi bi-chevron-left";
  searchBackButton.onclick = () => updateMainScreenForDrug(currentSearchedDrug);

  try {
    const response = await fetch(
      `${contextPath}/api/comparator?keyword=${encodeURIComponent(
        currentSearchedDrug
      )}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const alternativeMedicines = await response.json();
    const drugList = alternativeMedicines.map((med) => med.productName);
    displaySearchResults({ drugList: drugList });
  } catch (error) {
    console.error("대체 약품을 가져오는 데 실패했습니다:", error);
    displaySearchResults({ drugList: [] });
  }
}

// 메인 화면 하단 패널에 약국 목록을 채우는 함수
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

// 하단 패널에 약국의 상세 정보를 표시하는 함수
async function showPharmacyDetailsInPanel(name, stock, drugName) {
  const pharmacyList = bottomPanel.querySelector(".pharmacy-list");
  pharmacyList.innerHTML =
    "<div style='text-align:center; padding: 20px;'>로딩 중...</div>";
  document.querySelector(".alt-search-btn").style.display = "none";
  panelTitle.style.display = "none";

  const pharmacy = pharmacyDatabase[name];
  if (!pharmacy) return;

  const notice = await fetchNotice(pharmacy.id);

  const detailView = document.createElement("div");
  detailView.className = "pharmacy-detail-content";

  const backFunction = drugName
    ? `updateMainScreenForDrug('${drugName.replace(/'/g, "'")}')`
    : "goHome()";
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
    stockBadge = `<span class="badge ${badgeColor} ms-2">${stockTag}</span>`;
  }

  detailView.innerHTML = `
    <h2 style="10px auto 20px auto;">${name}${stockBadge}</h2>
    <p><i class="bi bi-telephone me-2"></i> ${pharmacy.phone || "정보 없음"}</p>
    <p><i class="bi bi-capsule me-2"> </i> ${pharmacy.info || "정보 없음"}</p>
    <p><i class="bi bi-megaphone me-2"></i> ${notice || "정보 없음"}</p>
    <div class="d-flex justify-content-center mt-2 sticky-bottom-btn-container">
      <span class="list-badge badge text-bg-light shadow-sm" onclick="${backFunction}">
        <i class="bi bi-list-task me-2"></i>목록 보기
      </span>
    </div>
  `;

  pharmacyList.innerHTML = "";
  pharmacyList.appendChild(detailView);
  bottomPanel.classList.add("active");
}
