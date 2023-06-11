const timeline = new TimelineMax({ paused: true });

timeline
.to("body", 0.15, { backgroundColor: "white" })
.to("body", 0.15, { backgroundColor: "#222" });

function flashScreen() {
  timeline.restart();
}
