fetch("/medgo/pharmacy/api/monthly-sales")
  .then((response) => response.json())
  .then((data) => {
    console.log("월간 데이터"); 
    console.log('data:', data);
    console.log(data.map((item) => item.sales)); // API에서 받은 데이터 확인
    console.log(data.map((item) => item.month)); // API에서 받은 데이터 확인
    console.log("--------");
    // // 차트 데이터 업데이트
    // chartMonthlySales.updateSeries([
    //   {
    //     name: "sales",
    //     data: data.map((item) => item.sales), // API에서 받은 데이터로 업데이트
    //   },
    // ]);
    // // x축 카테고리 업데이트 (월)
    // chartMonthlySales.updateOptions({
    //   xaxis: {
    //     categories: data.map((item) => item.month),
    //   },
    // });
    // // 차트 다시 렌더링
    // chartMonthlySales.render();
  });

fetch("/medgo/pharmacy/api/top-selling")
  .then((response) => response.json())
  .then((data) => {
    console.log("3의약품 데이터");
    console.log('data:', data);
    console.log(data.map((item) => item.medicineName)); // API에서 받은 데이터 확인
    console.log(data.map((item) => item.totalSold)); // API에서 받은 데이터 확인
    console.log("--------");
    // // 차트 데이터 업데이트
    // chartTopSelling.updateSeries(data.map((item) => item.totalSold));
    // chartTopSelling.updateOptions({
    //   labels: data.map((item) => item.medicineName),
    // });
    // // 차트 다시 렌더링
    // chartTopSelling.render();
  });

fetch("/medgo/pharmacy/api/recent-stock-history")
  .then((response) => response.json())
  .then((data) => {
    console.log("입출고 데이터");
    console.log('data:', data);
    console.log(data.map((item) => item.medicineName)); // API에서 받은 데이터 확인
    console.log(data.map((item) => item.quantity)); // API에서 받은 데이터 확인
    console.log(data.map((item) => item.outQuantity)); // API에서 받은 데이터 확인
    console.log("=========");
    // 차트 데이터 업데이트
    // myline.data.labels = data.map((item) => item.transactionDate);
    // myline.data.datasets[0].data = data.map((item) => item.inQuantity);
    // myline.data.datasets[1].data = data.map((item) => item.outQuantity);
    // myline.update(); // 차트 업데이트
  });

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
