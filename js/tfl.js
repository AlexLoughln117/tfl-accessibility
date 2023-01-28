export const fetchTFL = async () => {
  try {
    const response = await fetch("https://tfl.gov.uk/tfl/syndication/feeds/step-free-tube-guide.xml");
    const data = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");

    const stationNames = xml.getElementsByTagName("StationName");
    const accessibilityLevels = xml.getElementsByTagName("AccessibilityType");

    const stationNameText = Array.from(stationNames).map((station) => station.textContent).join("<br>");
    const accessibilityLevelText = Array.from(accessibilityLevels).map((level) => level.textContent).join("<br>");

    document.getElementById("column1-inner").innerHTML = stationNameText;
    document.getElementById("column2-inner").innerHTML = accessibilityLevelText;

  } catch (error) {
    console.error(error);
  }
};
