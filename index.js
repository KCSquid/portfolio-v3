window.onload = function () {
  window.scrollTo(0, 0);
  window.history.scrollRestoration = "manual";
};

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

$(document).ready(() => {
  $(document).mousemove(function (event) {
    windowWidth = $(window).width();
    windowHeight = $(window).height();

    mouseXpercentage = Math.round((event.pageX / windowWidth) * 100);
    mouseYpercentage = Math.round(
      ((event.pageY - $(document).scrollTop()) / windowHeight) * 100
    );

    color = "#3730a3";

    $(".radial-gradient").css(
      "background",
      `radial-gradient(circle at ${mouseXpercentage}% ${mouseYpercentage}%, ${color} 1%, transparent 100%)`
    );
  });

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const greet = document.getElementById("greeting");
  const greetings = [
    "Hey",
    "Bonjour",
    "Hallo",
    "Привет",
    "Hola",
    "Ciao",
    "السلام عليكم",
    "Selam",
    "Olá",
    "Hej",
    "नमस्ते",
    "Dzień dobry",
  ];
  let index = 0;
  const writeLoop = async () => {
    while (true) {
      for (let i = 0; i <= greetings[index].length; i++) {
        greet.innerHTML = greetings[index].substring(
          0,
          greetings[index].length - i
        );
        await sleep(125);
      }

      await sleep(400);
      index++;
      if (index >= greetings.length) {
        index = 0;
      }

      for (let i = 0; i <= greetings[index].length; i++) {
        greet.innerHTML = greetings[index].substring(0, i);
        await sleep(125);
      }

      await sleep(2500);
    }
  };

  writeLoop();

  const max = 50;
  const min = 10;
  for (let i = 0; i < 50; i++) {
    const randomX = Math.random() * window.screen.width - 60;
    const randomTime = Math.random() * 20 + 5;
    $("#bubbles").append(
      `<span style="--i:${Math.round(
        Math.random() * (max - min) + min
      )}; left: ${randomX}px; animation-duration: ${randomTime}s;"></span>`
    );
  }

  const duolingoApiUrl =
    "https://www.duolingo.com/2017-06-30/users/903879009?fields=streakData";

  $.get(duolingoApiUrl, (data, status) => {
    if (status === "success") {
      $("#streakCount").text(data.streakData.currentStreak["length"]);
      $("#streakExtended").text(data.streakData.currentStreak.lastExtendedDate);
      const date = new Date();
      if (
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` !=
        data.streakData.currentStreak.lastExtendedDate
      ) {
        $("#streakIcon").attr(
          "src",
          "https://d35aaqx5ub95lt.cloudfront.net/images/streakCalendar/915a7a5265c20f671cb9196bd27a8f42.svg"
        );
      }
    } else {
      $("#streakCount").text(status);
      $("#streakExtended").text(status);
    }
  });

  $("#mouseGlow").change(function () {
    if (this.checked) {
      $(".radial-gradient").css("display", "");
    } else {
      $(".radial-gradient").css("display", "none");
    }
  });
});

const elScroll = (id) => {
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $(id).offset().top,
    },
    2000
  );
};

const categories = ["#skills", "#experience", "#languages"];
const setReading = (id) => {
  if (!$(id).attr("reading")) {
    $(id).attr("reading", "true");
    $(id + "Title").attr("reading", "true");

    for (let i = 0; i < categories.length; i++) {
      if (categories[i] != id) {
        $(categories[i]).removeAttr("reading");
        $(categories[i] + "Title").removeAttr("reading");
      }
    }
  }
};

const showKCSquid = () => {
  if ($(".kcsquid").attr("showing") === "") {
    $(".kcsquid").css("transition", "1.2s ease");
    $(".kcsquid").removeAttr("showing");
  } else {
    $(".kcsquid").css("transition", "0.8s ease");
    $(".kcsquid").attr("showing", "");
    setTimeout(() => {
      $(".kcsquid").css("transition", "0.4s ease");
    }, 500);
  }
};

const showSettings = () => {
  $(".settingsMenu").css("pointer-events", "all");
  $(".settingsMenu").css("opacity", 1);
  $(".settings").css("display", "none");
};

const hideSettings = () => {
  $(".settingsMenu").css("opacity", 0);
  $(".settingsMenu").css("pointer-events", "none");

  $(".settings").css("display", "");
};
