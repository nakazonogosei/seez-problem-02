// 各要素を定数に格納
const birthdayList1 = document.getElementById('birthday1');
const birthdayList2 = document.getElementById('birthday2');
const birthdayButton = document.getElementById('birthdayButton');
const jsonUrls = ['niji_birth.json', 'niji_color.json'];

// STEP 1 & 2
fetch("sample.json")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    console.log((result));
  })
  .catch((error) => {
    console.log(error);
  });

// STEP3
async function fetchJsons1(urls) {
  try {
    const fetchUrls = urls.map(url => fetch(url).then(response => response.json()));
    const [jsonData1, jsonData2] = await Promise.all(fetchUrls);

    for (let i = 0; i < jsonData1.length; i++) {
      birthdayList1.innerHTML +=
        `<li>
        <img src="https://cdn.wikiwiki.jp/to/w/nijisanji/${jsonData1[i].name}/::ref/face.png" width="20" height="20">
        <span style="color:${jsonData2[i].color}">${jsonData1[i].name}</span>の誕生日は${jsonData1[i].birth}です
        </li>`;
    }
  } catch (error) {
    console.error(error);
  }
}
birthdayButton.addEventListener("click", function() {
  fetchJsons1(jsonUrls);
});

// STEP4
async function fetchJsons2(urls) {
  try {
    const fetchUrls = urls.map(url => fetch(url).then(response => response.json()));
    const [jsonData1, jsonData2] = await Promise.all(fetchUrls);

    for (let i = 0; i < jsonData1.length; i++) {
      birthdayList2.innerHTML +=
        `<li>
        <img src="https://cdn.wikiwiki.jp/to/w/nijisanji/${jsonData1[i].name}/::ref/face.png" width="20" height="20">
        <span style="color:${jsonData2[i].color}">${jsonData1[i].name}</span>の誕生日は${jsonData1[i].birth}です
        </li>`;
    }
  } catch (error) {
    console.error(error);
  }
}
window.addEventListener("load", function() {
  fetchJsons2(jsonUrls);
});
