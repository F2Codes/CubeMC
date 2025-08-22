const releasesDiv = document.getElementById("releases");

fetch("https://api.github.com/repos/F2Codes/CubeMC/releases")
  .then((res) => res.json())
  .then((releases) => {
    if (!releases || releases.length === 0) {
      releasesDiv.innerHTML = "<p>No releases yet.</p>";
      return;
    }

    const list = document.createElement("ul");
    releases.forEach((rel) => {
      const li = document.createElement("li");
      const asset = rel.assets[0];
      li.innerHTML = `
        <strong>${rel.name}</strong> - ${rel.published_at.split("T")[0]}<br/>
        <a href="${asset.browser_download_url}" class="btn">Download</a>
      `;
      list.appendChild(li);
    });
    releasesDiv.innerHTML = "";
    releasesDiv.appendChild(list);
  })
  .catch(() => {
    releasesDiv.innerHTML = "<p>Error loading releases.</p>";
  });
