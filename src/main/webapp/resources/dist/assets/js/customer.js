// --- DOM 요소 참조 ---
const mainAppScreen = document.getElementById("main-app-screen");
const bottomPanel = document.querySelector(".bottom-panel");
const searchInput = document.querySelector(".search-box input");
const searchResultsContainer = document.getElementById(
  "search-results-container"
);
const mapPlaceholder = document.getElementById("map-placeholder");
const homeButton = document.querySelector(".home-button");
const panelTitle = document.querySelector(".panel-title");
const searchBox = document.querySelector(".search-box");
const searchBackButton = document.getElementById("search-back-button");
const mapControlsContainer = document.getElementById("map-controls-container");
const capsuleStripContainer = document.getElementById(
  "capsule-strip-container"
);
const capsuleStrip = document.getElementById("capsule-strip");

// --- 전역 상태 변수 ---
let map; // 카카오 지도 인스턴스
let markers = []; // 모든 지도 마커를 저장하는 배열
let selectedMarker = null; // 현재 선택된 마커
let currentSearchedDrug = null; // 현재 검색된 약품
let userLocationMarker = null; // 사용자 위치 마커

// --- 목업 데이터 (실제 앱에서는 API로 대체되어야 함) ---
// 약품 정보
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
// 약국 정보
const pharmacyDatabase = {
  온누리약국: {
    id: 101,
    distance: "0.8 km",
    drugs: { "타이레놀정 500mg": "많음", 게보린정: "적음" },
    phone: "02-777-1234",
    info: "연중무휴, 주차 가능",
    notice:
      "8월 15일 광복절 정상 영업합니다.8월 15일 광복절 정상 영업합니다.8월 15일 광복절 정상 영업합니다.8월 15일 광복절 정상 영업합니다.8월 15일 광복절 정상 영업합니다.8월 15일 광복절 정상 영업합니다.8월 15일 광복절 정상 영업합니다.",
    latlng: new kakao.maps.LatLng(37.583946, 126.999368),
  },
  늘봄약국: {
    id: 102,
    distance: "1.2 km",
    drugs: { "타이레놀정 500mg": "보통", 펜잘큐정: "많음" },
    phone: "02-345-5678",
    info: "평일 09:00 ~ 21:00, 주말 09:00 ~ 18:00",
    notice: "매월 첫째 주 일요일 휴무",
    latlng: new kakao.maps.LatLng(37.584075, 126.999779),
  },
  정다운약국: {
    id: 103,
    distance: "1.5 km",
    drugs: { "부루펜정 400mg": "많음", 게보린정: "보통" },
    phone: "02-987-6543",
    info: "주차 공간 협소, 대중교용 이용 권장",
    notice: "추석 연휴 정상 영업",
    latlng: new kakao.maps.LatLng(37.583819, 126.99997),
  },
  새로운약국: {
    id: 104,
    distance: "2.1 km",
    drugs: { 펜잘큐정: "적음", "타이레놀 콜드-에스정": "많음" },
    phone: "02-111-2222",
    info: "온라인 상담 가능",
    notice: "8월 14일 임시 휴무",
    latlng: new kakao.maps.LatLng(37.584275, 126.999405),
  },
  미래약국: {
    id: 105,
    distance: "0.5 km",
    drugs: { "탁센 400 이부프로펜": "많음", 지르텍정: "보통" },
    phone: "02-555-8888",
    info: "애완동물 출입 가능",
    notice: "여름 휴가: 8월 1일 ~ 8월 5일",
    latlng: new kakao.maps.LatLng(37.583815, 127.000232),
  },
  대학약국: {
    id: 106,
    distance: "0.9 km",
    drugs: { "이지엔6 애니": "많음", "후시딘 연고": "많음" },
    phone: "02-880-5555",
    info: "학생증 제시 시 10% 할인",
    notice: "시험 기간 24시간 운영",
    latlng: new kakao.maps.LatLng(37.583498, 126.999636),
  },
  솔약국: {
    id: 107,
    distance: "1.1 km",
    drugs: { "훼스탈 플러스정": "적음", 클라리틴정: "보통" },
    phone: "02-234-5678",
    info: "주차 1시간 무료",
    notice: "정기 휴일: 매월 셋째 주 수요일",
    latlng: new kakao.maps.LatLng(37.5840962062084, 127.001203939944),
  },
  메디컬약국: {
    id: 108,
    distance: "1.3 km",
    drugs: { "마데카솔케어 연고": "많음", 인사돌플러스정: "적음" },
    phone: "02-555-1111",
    info: "병원 건물 내 위치",
    notice: "일요일은 13시까지 운영",
    latlng: new kakao.maps.LatLng(37.5821939283808, 126.998240159953),
  },
  희망약국: {
    id: 109,
    distance: "1.8 km",
    drugs: { 이가탄에프캡슐: "보통", "게보린 릴랙스 연질캡슐": "많음" },
    phone: "02-888-9999",
    info: "연중무휴",
    notice: "공휴일 정상 영업",
    latlng: new kakao.maps.LatLng(37.5858981399461, 126.999799981853),
  },
  중앙약국: {
    id: 110,
    distance: "2.2 km",
    drugs: { 닥터베아제: "많음", "어린이 부루펜 시럽": "많음" },
    phone: "02-123-4567",
    info: "공영주차장 이용 가능",
    notice: "7월 20일 ~ 7월 25일 재고 정리 휴무",
    latlng: new kakao.maps.LatLng(37.5844697286306, 127.00111241591),
  },
  프라자약국: {
    id: 111,
    distance: "2.5 km",
    drugs: { "타이레놀 콜드-에스정": "적음", 펜잘이알서방정: "보통" },
    phone: "02-789-0123",
    info: "상가 내 위치, 주차 2시간 무료",
    notice: "매주 일요일 휴무",
    latlng: new kakao.maps.LatLng(37.5835061624959, 127.002384859134),
  },
  "365약국": {
    id: 112,
    distance: "2.8 km",
    drugs: { 지르텍정: "많음", "후시딘 연고": "적음" },
    phone: "02-365-0365",
    info: "365일 연중무휴",
    notice: "야간 할증 없음",
    latlng: new kakao.maps.LatLng(37.5822824428361, 126.998019800391),
  },
  서울약국: {
    id: 113,
    distance: "3.1 km",
    drugs: { 인사돌플러스정: "많음", "타이레놀정 500mg": "많음" },
    phone: "02-777-7777",
    info: "외국어 상담 가능 (영어, 중국어)",
    notice: "8월 15일 광복절 18시까지 영업",
    latlng: new kakao.maps.LatLng(37.5841523503926, 127.002381215241),
  },
  연세약국: {
    id: 114,
    distance: "3.5 km",
    drugs: { "이지엔6 프로": "보통", "마데카솔 분말": "보통" },
    phone: "02-333-4444",
    info: "처방전 접수 가능",
    notice: "매월 둘째, 넷째 주 일요일 휴무",
    latlng: new kakao.maps.LatLng(37.5814954523998, 127.00089899038),
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

// --- 앱 초기화 ---
window.onload = () => {
  initializeMap();
  goHome();
  populateCapsuleStrip();
};

// --- 이벤트 리스너 ---

// 검색창에 포커스가 가면 검색 화면으로 전환합니다.
searchInput.addEventListener("focus", () => {
  resetAllMarkers(); // 모든 마커 리셋
  mainSearchBoxDisplay();

  // 뒤로가기 버튼을 '홈으로 가기' 기능으로 설정합니다.
  searchBackButton.className = "bi bi-chevron-left";
  searchBackButton.onclick = goHome;

  // 현재 입력된 값으로 검색 결과를 표시합니다.
  displaySearchResults({ query: searchInput.value });
});

// 검색창에 입력이 발생할 때마다 검색 결과를 업데이트합니다.
searchInput.addEventListener("input", () => {
  displaySearchResults({ query: searchInput.value });
});

// 하단 패널을 클릭하거나 핸들을 드래그하여 패널을 열고 닫습니다.
bottomPanel.addEventListener("click", (event) => {
  // 패널 자체나 핸들을 클릭했을 때만 동작합니다.
  if (
    event.target === bottomPanel ||
    event.target.classList.contains("panel-handle")
  ) {
    bottomPanel.classList.toggle("active");
  }
});

// --- 지도 관련 함수 ---

// 사용자의 현재 위치를 기반으로 지도를 중앙에 배치합니다.
function centerMapOnUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const userLocation = new kakao.maps.LatLng(lat, lon);
        const currentImg = contextPath + "/resources/dist/assets/images/myLoc.svg";
        const currentImgSize = new kakao.maps.Size(30, 30);
        const currentMarkerImage = new kakao.maps.MarkerImage(
          currentImg,
          currentImgSize
        );
        // 사용자 위치 	마커가 이미 있으면 위치를 업데이트하고, 없으면 새로 생성합니다.
        if (userLocationMarker) {
          userLocationMarker.setPosition(userLocation);
        } else {
          userLocationMarker = new kakao.maps.Marker({
            position: userLocation,
            map: map,
            image: currentMarkerImage,
          });
        }
        map.setLevel(1); // 지도 확대 레벨 설정
        map.setCenter(userLocation); // 지도 중심을 사용자 위치로 이동
        map.panBy(0, 50); // 패널에 가려지는 것을 고려하여 지도 중심을 약간 위로 이동
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

// 모든 마커를 기본 상태(작은 아이콘)로 되돌리고 선택을 해제합니다.
function resetAllMarkers() {
  const normalImg = contextPath +  "/resources/dist/assets/images/markerS.svg";
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

// ID로 마커를 찾아 선택하고, 지도 중심으로 이동시키는 함수
function selectMarkerById(pharmacyId) {
  const targetMarker = markers.find(
    (marker) => marker.pharmacyId === pharmacyId
  );
  if (!targetMarker) return;

  // 이전에 선택된 마커가 있다면 원래 이미지로 되돌립니다.
  if (selectedMarker && selectedMarker !== targetMarker) {
    const normalImg =  contextPath + "/resources/dist/assets/images/markerS.svg";
    const normalImgSize = new kakao.maps.Size(40, 40);
    selectedMarker.setImage(
      new kakao.maps.MarkerImage(normalImg, normalImgSize)
    );
  }

  // 현재 클릭된 마커의 이미지를 변경합니다.
  const clickImg =  contextPath + "/resources/dist/assets/images/markerL.svg";
  const clickImgSize = new kakao.maps.Size(80, 80);
  targetMarker.setImage(new kakao.maps.MarkerImage(clickImg, clickImgSize));
  selectedMarker = targetMarker;

  // 지도를 클릭된 마커 중심으로 이동시킵니다.
  map.setLevel(1);
  map.setCenter(targetMarker.getPosition());
  map.panBy(0, 50);
}

// 카카오 맵 설정
function initializeMap() {
  var mapContainer = document.getElementById("map-placeholder"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(37.583802, 126.999801), // 지도의 중심좌표
      level: 1, // 지도의 확대 레벨
    };

  map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  // 마커 이미지 크기 설정
  var normalImg =  contextPath + "/resources/dist/assets/images/markerS.svg";
  var normalImgSize = new kakao.maps.Size(40, 40);
  var clickImg =  contextPath + "/resources/dist/assets/images/markerL.svg";
  var clickImgSize = new kakao.maps.Size(80, 80);

  // 약국 데이터베이스를 기반으로 마커를 생성합니다.
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

      // 생성된 마커에 약국 ID를 커스텀 데이터로 저장합니다.
      marker.pharmacyId = pharmacy.id;
      markers.push(marker);

      // 마커에 클릭 이벤트를 추가합니다.
      kakao.maps.event.addListener(
        marker,
        "click",
        ((m, clickImg) => {
          return function () {
            // 이전에 선택된 마커가 있다면 원래 이미지로 되돌립니다.
            if (selectedMarker && selectedMarker !== m) {
              selectedMarker.setImage(
                new kakao.maps.MarkerImage(normalImg, normalImgSize)
              );
            }

            // 현재 클릭된 마커의 이미지를 변경합니다.
            m.setImage(clickImg);

            // 선택된 마커 변수를 현재 마커로 업데이트합니다.
            selectedMarker = m;

            // --- ID를 기반으로 약국 정보 찾기 시작 ---
            const pharmacyId = m.pharmacyId; // 마커에서 ID를 가져옵니다.
            let pharmacyName = null;
            let pharmacyData = null;

            // ID를 사용하여 데이터베이스에서 해당 약국을 찾습니다.
            for (const name in pharmacyDatabase) {
              if (pharmacyDatabase[name].id === pharmacyId) {
                pharmacyName = name;
                pharmacyData = pharmacyDatabase[name];
                break;
              }
            }

            // 약국을 찾지 못하면 오류를 출력하고 함수를 종료합니다.
            if (!pharmacyName) {
              console.error(
                "ID에 해당하는 약국을 찾을 수 없습니다:",
                pharmacyId
              );
              return;
            }
            // --- ID를 기반으로 약국 정보 찾기 끝 ---

            let stock = "정보 보기";
            let drugNameToShow = null;

            // 만약 특정 약품이 검색된 상태라면, 해당 약국의 재고 정보를 가져옵니다.
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

            // 하단 패널에 약국 상세 정보를 표시합니다.
            showPharmacyDetailsInPanel(
              pharmacyName, // 찾은 약국 이름을 전달합니다.
              stock,
              drugNameToShow
            );

            // 지도를 클릭된 마커 중심으로 이동시킵니다.
            map.setLevel(1);
            map.setCenter(m.getPosition());
            map.panBy(0, 50);
          };
        })(marker, clickImage)
      );
    }
  }

  // 지도 영역을 클릭하면 모든 마커가 리셋됩니다.
  kakao.maps.event.addListener(map, "click", function (mouseEvent) {
    resetAllMarkers();
  });
}

// 하단 패널 약국 아이템 클릭 시 해당 마커로 이동
document
  .querySelector(".bottom-panel .pharmacy-list")
  .addEventListener("click", function (event) {
    const listItem = event.target.closest(".pharmacy-item"); // 클릭된 .pharmacy-item 요소를 찾습니다.
    if (!listItem) {
      return; // .pharmacy-item이 아닌 다른 곳을 클릭한 경우
    }

    // listItem의 dataset에서 약국 ID를 추출합니다.
    const pharmacyId = parseInt(listItem.dataset.pharmacyId); // ID는 숫자로 변환

    // 전역 'markers' 배열에서 해당 pharmacyId를 가진 마커를 찾습니다.
    const targetMarker = markers.find(
      (marker) => marker.pharmacyId === pharmacyId
    );

    if (targetMarker) {
      // 지도를 해당 마커의 위치로 부드럽게 이동시킵니다.
      map.panTo(targetMarker.getPosition());

      // (선택 사항) 마커 클릭 이벤트도 트리거하여 정보창 등을 띄울 수 있습니다.
      // 기존 마커 클릭 로직을 재사용하기 위해 selectMarkerById 함수를 호출합니다.
      selectMarkerById(pharmacyId);
    }
  });

// --- UI 구성 요소 생성 ---

// 메인 서치박스 디자인
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

// 약품 종류 뱃지를 생성하여 상단에 표시합니다.
function populateCapsuleStrip() {
  const categories = Object.keys(drugDatabase);
  capsuleStrip.innerHTML = ""; // 기존 뱃지를 비웁니다.
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

// 카테고리(뱃지)를 클릭하여 약품을 필터링하고 검색 결과를 보여줍니다.
function filterByCapsule(category) {
  resetAllMarkers();
  mainSearchBoxDisplay();

  // 뒤로가기 버튼 설정
  searchBackButton.className = "bi bi-chevron-left";
  searchBackButton.onclick = goHome;

  const drugList = drugDatabase[category].drugs;
  displaySearchResults({ drugList: drugList });
}

// --- 뱃지 스트립 드래그 스크롤 구현 ---
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
  const walk = (x - startX) * 2; // 스크롤 속도 조절
  capsuleStrip.scrollLeft = scrollLeft - walk;
});

// --- 화면 상태 변경 함수 ---

// 검색어 또는 약품 목록에 따라 검색 결과를 화면에 표시합니다.
function displaySearchResults({ query, drugList = null }) {
  searchResultsContainer.innerHTML = "";
  let results = [];

  if (drugList) {
    // 약품 목록이 직접 제공된 경우
    results = drugList;
  } else {
    // 검색어를 기반으로 약품을 찾는 경우
    const lowerCaseQuery = query.toLowerCase().trim();
    if (!lowerCaseQuery) {
      // 검색어가 없으면 모든 약품을 표시
      for (const category in drugDatabase) {
        results.push(...drugDatabase[category].drugs);
      }
    } else {
      // 카테고리 이름 또는 약품 이름에서 검색
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
  }

  // 중복된 결과 제거
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

// 앱의 초기 상태인 홈 화면으로 돌아갑니다.
function goHome() {
  resetAllMarkers();
  currentSearchedDrug = null; // 검색된 약품 상태 초기화
  mapControlsContainer.style.display = "flex";
  mapControlsContainer.style.top = "8em";
  capsuleStripContainer.style.display = "block";
  capsuleStripContainer.style.top = "4.5em";
  bottomPanel.style.display = "flex";
  homeButton.style.display = "none";

  // 뒤로가기 버튼을 약 아이콘으로 변경하고 기능을 제거합니다.
  searchBackButton.style.display = "block";
  searchBackButton.className = "bi bi-capsule-pill";
  searchBackButton.onclick = null;

  mapPlaceholder.style.display = "block";
  searchResultsContainer.style.display = "none";
  searchBox.style.display = "flex";
  searchBox.style.border = "1px solid #ddd";
  searchBox.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
  searchInput.value = "";

  // 모든 마커를 다시 표시합니다.
  for (const marker of markers) {
    marker.setVisible(true);
  }

  populateMainPharmacyList(); // 하단 패널에 전체 약국 목록을 표시합니다.
  document.querySelector(".alt-search-btn").style.display = "none";
  panelTitle.style.display = "block";
  centerMapOnUserLocation();
}

// 특정 약품을 선택했을 때, 해당 약품을 보유한 약국 목록을 지도와 함께 보여줍니다.
function updateMainScreenForDrug(drugName) {
  centerMapOnUserLocation();
  currentSearchedDrug = drugName; // 현재 검색된 약품으로 설정
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

  searchInput.value = drugName; // 검색창에 약품 이름을 표시합니다.

  // 뒤로가기 버튼을 활성화하고 홈으로 가는 기능을 부여합니다.
  searchBackButton.style.display = "block";
  searchBackButton.className = "bi bi-chevron-left";
  searchBackButton.onclick = goHome;

  // 하단 패널의 약국 목록을 비우고, 검색된 약품을 보유한 약국만 채워넣습니다.
  const pharmacyList = document.querySelector(".bottom-panel .pharmacy-list");
  pharmacyList.innerHTML = "";
  let found = false;
  for (const pharmacyName in pharmacyDatabase) {
    const pharmacy = pharmacyDatabase[pharmacyName];
    if (pharmacy.drugs && pharmacy.drugs[drugName]) {
      found = true;
      const item = document.createElement("div");
      item.className = "pharmacy-item";
      item.dataset.pharmacyId = pharmacy.id; // 약국 아이템에 data-pharmacy-id 추가
      item.onclick = () =>
        showPharmacyDetailsInPanel(
          pharmacyName,
          pharmacy.drugs[drugName],
          drugName
        );
      item.innerHTML = `<h3>${pharmacyName}</h3><span>${pharmacy.distance}</span>`;
      pharmacyList.appendChild(item);
    }
  }

  // 해당 약품을 보유한 약국이 없는 경우 메시지를 표시합니다.
  if (!found) {
    pharmacyList.innerHTML = `<p style=\"text-align: center; color: #888; padding-top: 20px;\">재고를 보유한 약국이 없습니다.</p>`;
  }

  // 지도 마커를 필터링하여 해당 약품을 보유한 약국만 표시합니다.
  for (const marker of markers) {
    const pharmacyName = marker.getTitle();
    const pharmacy = pharmacyDatabase[pharmacyName];

    if (pharmacy && pharmacy.drugs && pharmacy.drugs[drugName]) {
      marker.setVisible(true);
    } else {
      marker.setVisible(false);
    }
  }

  document.querySelector(".alt-search-btn").style.display = "block";
  centerMapOnUserLocation();
}

// 현재 약품과 동일한 카테고리의 다른 약품(대체 약품) 목록을 보여줍니다.
function showAlternatives() {
  if (!currentSearchedDrug) return;

  bottomPanel.style.display = "none";
  mapControlsContainer.style.display = "none";
  capsuleStripContainer.style.display = "none";
  mapPlaceholder.style.display = "none";
  searchResultsContainer.style.display = "block";
  searchBox.style.display = "flex";

  let drugList = alternativesDatabase[currentSearchedDrug] || []; // 대체약이 없으면 빈 배열

  searchBackButton.className = "bi bi-chevron-left";
  searchBackButton.onclick = () => updateMainScreenForDrug(currentSearchedDrug);

  displaySearchResults({ drugList: drugList });
}

// 홈 화면의 하단 패널에 전체 약국 목록을 채워넣습니다.
function populateMainPharmacyList() {
  const mainList = document.querySelector(".bottom-panel .pharmacy-list");
  mainList.innerHTML = "";
  for (const pharmacyName in pharmacyDatabase) {
    const pharmacy = pharmacyDatabase[pharmacyName];
    const item = document.createElement("div");
    item.className = "pharmacy-item";
    item.dataset.pharmacyId = pharmacy.id; // 약국 아이템에 data-pharmacy-id 추가
    item.onclick = (e) => {
      console.log(e);
      showPharmacyDetailsInPanel(pharmacyName, "정보 보기", null);
    };
    item.innerHTML = `<h3>${pharmacyName}</h3><span>${pharmacy.distance}</span>`;
    mainList.appendChild(item);
  }
}

// 특정 약국의 상세 정보를 하단 패널에 표시합니다.
function showPharmacyDetailsInPanel(name, stock, drugName) {
  const pharmacyList = bottomPanel.querySelector(".pharmacy-list");
  pharmacyList.innerHTML = "";
  document.querySelector(".alt-search-btn").style.display = "none";
  panelTitle.style.display = "none";

  const pharmacy = pharmacyDatabase[name];
  if (!pharmacy) return; // 약국 정보가 없으면 함수 종료

  const detailView = document.createElement("div");
  detailView.className = "pharmacy-detail-content";

  // '목록 보기' 버튼의 동작을 설정합니다.
  // 약품 검색을 통해 들어왔다면 약품 검색 결과로, 아니라면 홈 화면으로 돌아갑니다.
  const backFunction = drugName
    ? `updateMainScreenForDrug('${drugName.replace(/'/g, "'")}')`
    : "goHome()";

  let stockBadge = "";
  if (drugName) {
    let badgeColor = "text-bg-secondary"; // 기본값
    if (stock === "많음") badgeColor = "text-bg-success";
    if (stock === "보통") badgeColor = "text-bg-warning";
    if (stock === "적음") badgeColor = "text-bg-danger";
    stockBadge = `<span class=\"badge ${badgeColor} ms-2\">${stock}</span>`;
  }

  detailView.innerHTML = `
                 <h2 style=\"10px auto 20px auto;\">${name}${stockBadge}</h2>
                 <p><i class=\"bi bi-telephone me-2\"></i> ${
                   pharmacy.phone || "정보 없음"
                 }</p>
                 <p><i class=\"bi bi-capsule me-2\"> </i> ${
                   pharmacy.info || "정보 없음"
                 }</p>
                 <p><i class=\"bi bi-megaphone me-2\"></i> ${
                   pharmacy.notice || "정보 없음"
                 }</p>
                 <div class=\"d-flex justify-content-center mt-2 sticky-bottom-btn-container\">
                   <span class=\"list-badge badge text-bg-light shadow-sm\"  onclick=\"${backFunction}\" 
>
                     <i class=\"bi bi-list-task me-2\"></i>목록 보기
                   </span>
                 </div>
               `;
  pharmacyList.appendChild(detailView);
  bottomPanel.classList.add("active");
}
