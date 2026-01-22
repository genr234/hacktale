<script>
  export let maxWidth = 256; // px
  export let minWidth = 128; // px
  export let hoverScale = 1.05;
  export let enableHover = true;
</script>

<a
  class="flag"
  href="https://hackclub.com"
	target="_blank"
  aria-label="Hack Club"
  style="--max: {maxWidth}px; --min: {minWidth}px; --hover: {enableHover ? hoverScale : 1};"
>
  <img
    class="flag-img"
    src="https://assets.hackclub.com/flag-orpheus-left.svg"
    alt="Hack Club"
  />
</a>

<style>
  .flag {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: clamp(var(--min, 128px), 12vw, var(--max, 256px));
    max-width: 100%;
    z-index: 999;
    text-decoration: none;
  }

  .flag-img {
    display: block;
    width: 100%;
    height: auto;
    border: 0;
    transition: transform 180ms ease, filter 180ms ease;
    transform-origin: left top;
  }

  .flag:hover .flag-img {
    transform: scale(var(--hover, 1.05));
  }
</style>
