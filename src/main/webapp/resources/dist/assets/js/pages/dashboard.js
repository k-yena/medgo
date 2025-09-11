// // 한달 간의 입출고 차트 데이터 반환 - (라인차트)
// @GetMapping("/api/monthly-transactions")
// @ResponseBody
// public List<MonthlyTransactionDTO> getMonthlyTransactions() {
// 	int pharmacyid = 1; // 임시 데이터
// 	return mainDAO.getMonthlyTransactionData(pharmacyid);
// }

fetch("/api/monthly-transactions")
  .then((response) => response.json())
  .then((data) => {
    // 데이터를 차트에 반영하는 로직 작성
    console.log(data);
    //myline에 label이 입고면 입고 데이터에 data.quantity 넣기
    //myline에 label이 출고면 출고 데이터에 data.quantity 넣기
    myline.data.labels = data.map((item) => item.date);
    myline.data.datasets[0].data = data
      .filter((item) => item.transactionType === "입고")
      .map((item) => item.quantity);
    myline.data.datasets[1].data = data
      .filter((item) => item.transactionType === "출고")
      .map((item) => item.quantity);
    myline.update();
  })
  .catch((error) => console.error("Error", error));

// // 이번달 판매량 높은 약 데이터 반환- 원차트
// @GetMapping("/api/top-selling-medicines")
// @ResponseBody
// public List<TopSellingMedicinesDTO> getTopSellingMedicines() {
// 	int pharmacyid = 1; // 임시 데이터
// 	return mainDAO.getTopSellingMedicines(pharmacyid);
// }

fetch("/api/top-selling-medicines")
  .then((response) => response.json())
  .then((data) => {
    // 데이터를 차트에 반영하는 로직 작성
    console.log(data);
    //chartTopSelling에 data.sales 넣기
    chartTopSelling.updateSeries(data.map((item) => item.sales));
    //chartTopSelling에 labels.name 넣기
    chartTopSelling.updateOptions({
      labels: data.map((item) => item.name),
    });
  })
  .catch((error) => console.error("Error", error));

// // 월간 판매율 데이터 반환 - 바차트
// @GetMapping("/api/monthly-sales")
// @ResponseBody
// public List<MonthlySalesDTO> getMonthlySales() {
// 	int pharmacyid = 1; // 임시 데이터
// 	return mainDAO.getMonthlySalesData(pharmacyid);
// }

fetch("/api/monthly-sales")
  .then((response) => response.json())
  .then((data) => {
    // 데이터를 차트에 반영하는 로직 작성
    console.log(data);
    //chartMonthlySales에 data.sales 넣기
    chartMonthlySales.updateSeries([
      {
        name: "sales",
        data: data.map((item) => item.sales),
      },
    ]);
    //chartMonthlySales에 labels.month 넣기
    chartMonthlySales.updateOptions({
      xaxis: {
        categories: data.map((item) => item.month),
      },
    });
  })
  .catch((error) => console.error("Error", error));

// --- 메인화면 차트 ---
// 바 차트
var optionsMonthlySales = {
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

//월간 판매율
var chartMonthlySales = new ApexCharts(
  document.querySelector("#chart-monthly-sales"),
  optionsMonthlySales
);

// 원형 차트
let optionsTopSelling = {
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

//판매율 3대 약
var chartTopSelling = new ApexCharts(
  document.querySelector("#chart-top-selling"),
  optionsTopSelling
);

// --- 메인페이지 라인 데이터 ---
var line = document
  .getElementById("chart-recent-stock-history")
  .getContext("2d");
var gradient = line.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgba(50, 69, 209,1)");
gradient.addColorStop(1, "rgba(265, 177, 249,0)");

var myline = new Chart(line, {
  type: "line",
  // 데이터 라벨
  data: {
    labels: [
      "16-07-2025",
      "17-07-2025",
      "18-07-2025",
      "19-07-2025",
      "20-07-2025",
      "21-07-2025",
      "22-07-2025",
      "23-07-2025",
      "24-07-2025",
      "25-07-2025",
    ],
    datasets: [
      {
        label: "입고",
        // 데이터 넣는 곳
        data: [50, 25, 61, 50, 72, 52, 60, 41, 30, 45],
        backgroundColor: "rgba(93, 218, 181, 0.43)",
        borderWidth: 3,
        borderColor: "rgb(93, 218, 180)",
        pointBorderWidth: 0,
        pointBorderColor: "transparent",
        pointRadius: 3,
        pointBackgroundColor: "transparent",
        pointHoverBackgroundColor: "rgb(93, 218, 180)",
        fill: "origin",
      },
      {
        label: "출고",
        // 데이터 넣는 곳
        data: [20, 35, 45, 75, 37, 86, 45, 65, 25, 53],
        backgroundColor: "#8db6ee78",
        borderWidth: 3,
        borderColor: "#4c8de8ff",
        pointBorderWidth: 0,
        pointBorderColor: "transparent",
        pointRadius: 3,
        pointBackgroundColor: "transparent",
        pointHoverBackgroundColor: "#4c8de8ff",
        fill: "origin", // 시작점부터 채색
      },
    ],
  },
  options: {
    elements: {
      line: {
        tension: 0.4, // 곡선 설정
      },
    },
    responsive: true,
    layout: {
      padding: {
        top: 10,
      },
    },
    tooltips: {
      intersect: false,
      titleFontFamily: "Helvetica",
      titleMarginBottom: 10,
      xPadding: 10,
      yPadding: 10,
      cornerRadius: 3,
    },
    legend: {
      display: true,
    },
    scales: {
      y: {
        grid: {
          display: true,
          drawBorder: true,
        },
        ticks: {
          display: true,
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  },
});

// 데이터 받아오는 API후 데이터 넣기
// 차트 랜더링
chartMonthlySales.render();
chartTopSelling.render();
