//--- 데이터 받아오는 API ---
// 라인차트
fetch("/medgo/pharmacy/api/monthly-transactions")
  .then((response) => response.json())
  .then((data) => {
    let lineChartLabels = [];
    let lineChartDataIn = [];
    let lineChartDataOut = [];

    lineChartLabels = data.map((item) => item.transactionDate);
    lineChartDataIn = data.map((item) => item.totalIn);
    lineChartDataOut = data.map((item) => item.totalOut);

    var line = document
      .getElementById("chart-recent-stock-history")
      .getContext("2d");
    var gradient = line.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(50, 69, 209,1)");
    gradient.addColorStop(1, "rgba(265, 177, 249,0)");

    new Chart(line, {
      type: "line",
      // 데이터 라벨
      data: {
        labels: lineChartLabels,
        datasets: [
          {
            label: "입고",
            data: lineChartDataIn,
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
            data: lineChartDataOut,
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
        maintainAspectRatio: false,
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
  })
  .catch((error) => console.error("Error", error));

// 원형차트
fetch("/medgo/pharmacy/api/top-selling-medicines")
  .then((response) => response.json())
  .then((data) => {
    let circleChartLabels = [];
    let circleChartData = [];
    circleChartLabels = data.map((item) => item.medicineName);
    circleChartData = data.map((item) => item.totalSold);

    // 원형 차트
    let optionsTopSelling = {
      //데이터 값
      series: circleChartData,
      //라벨
      labels: circleChartLabels,
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
    var chartTopSelling = new ApexCharts(
      document.querySelector("#chart-top-selling"),
      optionsTopSelling
    );
    chartTopSelling.render();
  })
  .catch((error) => console.error("Error", error));

// 바차트
fetch("/medgo/pharmacy/api/monthly-sales")
  .then((response) => response.json())
  .then((data) => {
    let barChartCategories = [];
    let barChartData = [];
    barChartCategories = data.map((item) => item.month);
    barChartData = data.map((item) => item.totalSold);
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
          data: barChartData,
        },
      ],
      colors: "#435ebe",
      //차트 카테고리 (x)
      xaxis: {
        categories: [...barChartCategories],
      },
    };

    //월간 판매율
    var chartMonthlySales = new ApexCharts(
      document.querySelector("#chart-monthly-sales"),
      optionsMonthlySales
    );

    chartMonthlySales.render();
  })
  .catch((error) => console.error("Error", error));
