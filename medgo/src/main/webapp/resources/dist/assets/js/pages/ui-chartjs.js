// --- 메인페이지 라인 데이터 ---
var line = document.getElementById("line").getContext("2d");
var gradient = line.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgba(50, 69, 209,1)");
gradient.addColorStop(1, "rgba(265, 177, 249,0)");

var gradient2 = line.createLinearGradient(0, 0, 0, 400);
gradient2.addColorStop(0, "rgba(255, 91, 92,1)");
gradient2.addColorStop(1, "rgba(265, 177, 249,0)");

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
