// --- 메인화면 차트 ---
// 바 차트
var optionsProfileVisit = {
  annotations: {
    position: "back",
  },
  dataLabels: {
    enabled: false,
  },
  chart: {
    type: "bar",
    height: 300,
  },
  fill: {
    opacity: 1,
  },
  plotOptions: {},
  //차트 데이터 넣는 곳
  series: [
    {
      name: "sales",
      data: [9, 20, 30, 20, 10, 20, 30, 20, 10, 20, 30, 20],
    },
  ],
  colors: "#435ebe",
  //차트 카테고리 (x)
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
};

// 원형 차트
let optionsVisitorsProfile = {
  //데이터 값
  series: [45, 22, 33],
  //라벨
  labels: ["타이레놀", "이부프로펜", "아스피린"],
  colors: ["rgb(93, 218, 180)", "#9694ff", "#57caeb"],
  chart: {
    type: "donut",
    width: "100%",
    height: "350px",
  },
  legend: {
    position: "bottom",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "30%",
      },
    },
  },
};

var chartProfileVisit = new ApexCharts(
  document.querySelector("#chart-profile-visit"),
  optionsProfileVisit
);
var chartVisitorsProfile = new ApexCharts(
  document.getElementById("chart-visitors-profile"),
  optionsVisitorsProfile
);

// 데이터 받아오는 API후 데이터 넣기
// 차트 랜더링
chartProfileVisit.render();
chartVisitorsProfile.render();
