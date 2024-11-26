const puzzle = document.querySelector(".puzzle");
const pieces = document.querySelector(".pieces");
const paths = document.querySelectorAll(".puzzle path");
const endImg = document.querySelector(".endImg");
const kittens = [
"https://images.metmuseum.org/CRDImages/eg/original/DP245141.jpg?_gl=1*1k3zgdz*_gcl_au*MTQ5NzMxMzY0NC4xNzI1MDMwMjQy*_ga*ODM2MTc3NDcyLjE3MjUwMzAyNDI.*_ga_Y0W8DGNBTB*MTczMjUxMjE2My40OC4xLjE3MzI1MTIxOTQuMC4wLjA",
"https://images.metmuseum.org/CRDImages/ep/original/DP-411-01.jpg?_gl=1*1x7bxli*_gcl_au*MTQ5NzMxMzY0NC4xNzI1MDMwMjQy*_ga*ODM2MTc3NDcyLjE3MjUwMzAyNDI.*_ga_Y0W8DGNBTB*MTczMjUxNDYwNy40OS4xLjE3MzI1MTQ2NDYuMC4wLjA.",
"https://images.metmuseum.org/CRDImages/ep/original/DP-19709-001.jpg",
"https://images.metmuseum.org/CRDImages/gr/original/DT11982.jpg?_gl=1*f7x2at*_gcl_au*MTQ5NzMxMzY0NC4xNzI1MDMwMjQy*_ga*ODM2MTc3NDcyLjE3MjUwMzAyNDI.*_ga_Y0W8DGNBTB*MTczMjUxNDYwNy40OS4xLjE3MzI1MTQ5MDAuMC4wLjA.",
];
const startPos = [
  { x: 164, y: 56 },
  { x: 77, y: -35 },
  { x: -98, y: -23 },
  { x: -57, y: 105 },
  { x: -168, y: 39 },
  { x: -33, y: -5 },
  { x: -38, y: -60 },
  { x: -122, y: 71 },
  { x: 91, y: -13 },
  { x: 35, y: -5 },
  { x: -38, y: 16 },
  { x: 8, y: -88 },
  { x: 81, y: 4 },
  { x: 62, y: -66 },
  { x: -174, y: -45 },
  { x: 101, y: 36 },
  { x: 38, y: 33 },
  { x: -80, y: 29 },
  { x: -7, y: -106 },
  { x: 42, y: 19 }
];

paths.forEach((p, i) => {
  const piece = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const shadow = p.cloneNode("true");
  pieces.append(piece);
  piece.append(shadow);
  piece.append(p);

  gsap.set(piece, {
    transformOrigin: "50%",
    x: startPos[i].x,
    y: startPos[i].y,
    rotate: "random(-25,25)",
    attr: { class: "piece" }
  });
  gsap.set(shadow, { opacity: 0.35 });
  gsap.set(p, { attr: { fill: "url(#img)", filter: "url(#bevel)" } });
  let draggable = Draggable.create(piece, {
    onPress: () => {
      gsap
        .timeline({ defaults: { duration: 0.3 } })
        .to(
          piece,
          {
            scale: 1.1,
            rotate: "random(-5,5)",
            ease: "back.out(3)"
          },
          0
        )
        .to(
          shadow,
          { x: 1, y: 5, opacity: 0.15, scale: 0.9, ease: "back.out(1)" },
          0
        );
      pieces.append(piece);
    },
    onRelease: () => {
      gsap
        .timeline({ defaults: { duration: 0.2 } })
        .to(piece, { scale: 1, ease: "back.out(3)" }, 0)
        .to(shadow, { opacity: 0.35, x: 0, y: 0, scale: 1, ease: "power2" }, 0)
        .add(check);
      if (
        Math.abs(gsap.getProperty(piece, "x")) < 9 &&
        Math.abs(gsap.getProperty(piece, "y")) < 9
      ) {
        gsap.to(piece, { duration: 0.2, x: 0, y: 0, rotate: 0 });
      }
    }
  });
});

function check() {
  let n = 0;
  document.querySelectorAll(".piece").forEach((p) => {
    n += Math.abs(gsap.getProperty(p, "x"));
    n += Math.abs(gsap.getProperty(p, "y"));
  });
  if (n < 1) {
    puzzle.append(endImg);
    gsap.to(endImg, { duration: 1, opacity: 1, ease: "power2.inOut" });
  }
}

gsap.set(".endImg, .box, .pieces", { x: 82.5, y: 50 });
gsap.set("body", { background: "hsl(" + "random(30,104)" + ", 0%, 20%)" });
gsap.set("#imgSrc", {
  attr: {
    href: kittens[gsap.utils.random(0, kittens.length - 1, 1)] + "?q=50&w=2000"
  }
});