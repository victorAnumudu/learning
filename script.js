const stages = [
  {tag:"STAGE 01 / FOUNDATIONS", icon:"⌘", title:"Make the terminal your friend.", description:"Before you automate infrastructure, get comfortable moving around a Linux system. Learn what commands do, how files and permissions work, and how to inspect running processes safely.", points:["Navigate directories and manage files","Read permissions and ownership","Inspect processes, services, and logs"], duration:"EST. 1–2 WEEKS"},
  {tag:"STAGE 02 / COLLABORATION", icon:"⑂", title:"Give every change a history.", description:"Git helps you track changes and experiment safely. GitHub lets you share work, review code, and collaborate with other people.", points:["Create repositories and commits","Use branches and merge changes","Open pull requests and resolve conflicts"], duration:"EST. 1 WEEK"},
  {tag:"STAGE 03 / CONTAINERS", icon:"▣", title:"Package your app, not your laptop.", description:"Containers bundle an application with the things it needs to run. Learn the difference between an image and a running container, then build and run your own.", points:["Write a simple Dockerfile","Build and run container images","Publish an image to a registry"], duration:"EST. 1–2 WEEKS"},
  {tag:"STAGE 04 / AUTOMATION", icon:"⟳", title:"Let the pipeline do the repeatable work.", description:"Continuous integration and delivery automate common steps such as checking code, running tests, building images, and preparing releases.", points:["Understand workflow triggers and jobs","Create a GitHub Actions workflow","Store secrets safely and read job logs"], duration:"EST. 1–2 WEEKS"},
  {tag:"STAGE 05 / ORCHESTRATION", icon:"☸", title:"Tell the cluster what you want.", description:"Kubernetes manages containerized applications. Start locally with Minikube and learn how declarative manifests describe the desired state of your app.", points:["Understand Pods, Deployments, and Services","Deploy an app to Minikube","Explore GitOps and Argo CD sync"], duration:"EST. 2–4 WEEKS"},
  {tag:"STAGE 06 / CLOUD & RELIABILITY", icon:"☁", title:"Run it. Observe it. Improve it.", description:"Learn cloud fundamentals, infrastructure as code, and the signals that help teams understand service health. Build gradually and keep costs under control.", points:["Understand networking and cloud basics","Explore Terraform and infrastructure as code","Use logs, metrics, and alerts to troubleshoot"], duration:"EST. ONGOING"}
];
const roadmapItems = [...document.querySelectorAll(".roadmap-item")];
let completed = new Set();
function showStage(index) {
  const s = stages[index];
  document.getElementById("detailTag").textContent = s.tag;
  document.getElementById("detailIcon").textContent = s.icon;
  document.getElementById("detailTitle").textContent = s.title;
  document.getElementById("detailDescription").textContent = s.description;
  document.getElementById("detailDuration").textContent = s.duration;
  document.getElementById("detailList").innerHTML = s.points.map(point => `<li><span>✓</span> ${point}</li>`).join("");
  roadmapItems.forEach((item, i) => item.classList.toggle("active", i === index));
  const button = document.getElementById("markComplete");
  button.innerHTML = completed.has(index) ? 'Stage completed <span>✓</span>' : 'Mark stage complete <span>＋</span>';
}
roadmapItems.forEach(item => item.addEventListener("click", () => showStage(Number(item.dataset.stage))));
document.getElementById("markComplete").addEventListener("click", () => {
  const activeIndex = roadmapItems.findIndex(item => item.classList.contains("active"));
  if (completed.has(activeIndex)) completed.delete(activeIndex); else completed.add(activeIndex);
  showStage(activeIndex);
});
const command = document.getElementById("labCommand");
const description = document.getElementById("commandDescription");
document.querySelectorAll(".command-option").forEach(option => {
  option.addEventListener("click", () => {
    document.querySelectorAll(".command-option").forEach(button => button.classList.remove("selected"));
    option.classList.add("selected");
    command.textContent = option.dataset.command;
    description.textContent = option.dataset.description;
    document.getElementById("copyStatus").textContent = "SAFE COMMAND";
  });
});
document.getElementById("copyCommand").addEventListener("click", async () => {
  const text = command.textContent;
  const button = document.getElementById("copyCommand");
  try {
    await navigator.clipboard.writeText(text);
    button.innerHTML = "Copied ✓";
  } catch {
    const range = document.createRange();
    range.selectNodeContents(command);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    button.textContent = "Select & copy";
  }
  setTimeout(() => { button.innerHTML = 'Copy <span>▣</span>'; }, 1800);
});
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "✕" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));
document.getElementById("year").textContent = new Date().getFullYear();
showStage(0);
