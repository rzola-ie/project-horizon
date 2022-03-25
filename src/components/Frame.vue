<template>
  <div id="frame">
    <button @click="openAThing">
      open the simulator thing plz
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    openAThing() {
      let iframe = document.createElement("iframe");

      iframe.setAttribute("height", "844px");
      iframe.setAttribute("width", "390px");
      iframe.setAttribute("scrolling", "auto");
      iframe.setAttribute("src", window.origin);
      iframe.setAttribute("frameborder", "1");
      iframe.setAttribute("name", "symptoms simulator");
      iframe.setAttribute("marginheight", "0px");
      iframe.setAttribute("marginwidth", "0px");
      iframe.style.border = "0px none #ffffff";

      const newWindow = window.open(
        iframe.getAttribute('src'),
        iframe.getAttribute('name'),
				`height=844,
				width=390
				directories=no,
				titlebar=1,
				location=0,
				status=no,
				menubar=no,
				scrollbars=no,
				resizable=no`
      );
		console.log(newWindow)
			newWindow.document.write(iframe.outerHTML);
    },
  },
};
</script>

<style lang="scss" scoped>
#frame {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
	padding: 0.4em 1em;
	color: white;
	background-color: $color2;
	font-size: 2em;
	border: none;
	box-shadow: 0 4px 10px rgba(black, 0.36);
	border-radius: 2px;
	cursor: pointer;
}
</style>
