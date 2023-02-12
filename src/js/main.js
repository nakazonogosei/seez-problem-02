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

// STEP3 ボタンを押して birthdayList1 に出力
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

// STEP4 ページ読み込み後、 birthdayList2 に出力
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



// 課題03テスト
let keyword = document.getElementById("keyword");
let btn = document.getElementById("btn");
let content = document.getElementById("content");

console.log("hello");

const wikiFetch = async (inputValue) => { //asyncで非同期処理だと宣言する

  let wikiApiUrl = "https://ja.wikipedia.org/w/api.php";
  // let wikiApiUrl = `https://ja.wikipedia.org/w/api.php?origin=*&action=query&format=json&generator=search&gsrsearch=${inputValue}+hastemplate:生年月日と年齢&prop=pageimages&pithumbsize=300`;
  // let wikiApiUrl = `https://ja.wikipedia.org/w/api.php?origin=*&action=query&format=json&generator=search&gsrsearch=${inputValue}+hastemplate:生年月日と年齢&prop=pageimages&pithumbsize=300`;
  let params = {
    action: "query",
    generator: "search",
    gsrsearch: `${inputValue}+hastemplate:生年月日と年齢`,
    prop: "pageimages|extracts",
    exintro: true,
    explaintext: true,
    exsectionformat: "plain",
    pithumbsize: 300,
    // titles: inputValue,
    rvprop: "content",
    format: "json",
    formatversion: 2
  };
  wikiApiUrl = wikiApiUrl + "?origin=*";
  Object.keys(params).forEach(function (key) {
    wikiApiUrl += `&${key}=${params[key]}`;
  });
  console.log(wikiApiUrl);

  const fetchValue = fetch(wikiApiUrl, {
    method: "GET"
  })
  .then((value) => {
    return value.json(); //wikipediaからのデータをJSON形式に変換
  })
  .catch(() => {
    alert("wikipediaにうまくアクセスできないようだぜ!");
  });

  const valueJson = await fetchValue; //非同期処理を実行
  console.log(valueJson);

  // const valueTargets = valueJson.query.search; //必要な情報が入っている配列を取得
  const valueTargets = valueJson.query.pages; //必要な情報が入っている配列を取得
  // const valueTargets = valueJson.query; //必要な情報が入っている配列を取得
  // const valueTargets = valueJson.query; //必要な情報が入っている配列を取得
  console.log(valueTargets);
  // const valueTargetsParse = JSON.parse(valueTargets);
  // console.log(valueTargetsParse);
  // let debug = `<pre>${Object.value(valueTargets)}</pre>`;
  // let debug = `<pre>${valueTargets}</pre>`;
  // let debug = valueTargets;
  // let debug = JSON.parse(valueTargets);
      // debug = debug[0].thumnail.source;
  // console.log(debug);

  // Object.values(debug).forEach(function (value) {
  //   console.log('value:', value);
  //   console.log('thumbnail:', value["thumbnail"]["source"]);
  // });
  // let debug = `<pre>${valueTargets[0].thumnail.source}</pre>`;
  // let debug = `<pre>${valueTargetsParse}</pre>`;
  // content.innerHTML = debug;
  // console.table(debug);
  // console.log(debug);
  // console.table(valueTargets);

  if (!valueTargets.length) {
    const wikiNull = document.createElement("p");
    wikiNull.classList.add("p-wikipedia__null");
    wikiNull.textContent = "検索したワードはヒットしませんでした。";
    content.appendChild(wikiNull);
  } else {
    const elemWrap = document.createElement("div");
    elemWrap.classList.add("p-wikipedia__main");

    for (const elem of valueTargets) {


      //span要素を作ってタイトルを設定する
      const elemSpan = document.createElement("span");
      elemSpan.classList.add("p-wikipedia__block-title");
      const elemTitle = elem.title;
      // const elemTitle = elem["titles"]["canonical"];
      elemSpan.textContent = elemTitle;
      console.log(elemSpan);

      // 本文と画像を包む枠
      const elemDiv1 = document.createElement("div");
      elemDiv1.classList.add("p-wikipedia__block");

      // 本文
      const elemSpan3 = document.createElement("span");
      elemSpan3.classList.add("p-wikipedia__block-text");
      const elemText = elem["extract"];
      elemSpan3.textContent = elemText;
      console.log(elemSpan3);

      // 生年月日
      // const elemSpan4 = document.createElement("span");
      // elemSpan4.classList.add("p-wikipedia__block-ttl");
      // const elemBirthday = elem["year"];
      // elemSpan4.textContent = elemBirthday;
      // console.log(elemSpan4);

      //span要素を作って更新日を設定する
      // const elemSpan2 = document.createElement("span");
      // elemSpan2.classList.add("p-wikipedia__block-date");
      // const elemDate = elem.timestamp;
      // const elemDateSlice = elemDate.slice(0, 10).replace(/-/g, ".");
      // elemSpan2.textContent = "最終更新日：" + elemDateSlice;
      // console.log(elemSpan2);

      //img要素を作って画像を表示する
      const elemImage = document.createElement("img");
      elemImage.classList.add("p-wikipedia__image");
      // console.log(elem["thumbnail"]["source"]);
      elemImage.src = elem["thumbnail"]["source"];
      console.log(elemImage);

      //作成した要素を順番に組み合わせていく
      content.appendChild(elemWrap);
      elemWrap.appendChild(elemSpan);
      elemWrap.appendChild(elemDiv1);
      // elemWrap.appendChild(elemSpan2);
      elemDiv1.appendChild(elemSpan3);
      // elemWrap.appendChild(elemSpan4);
      elemDiv1.appendChild(elemImage);
    }
  }
};

//クリックイベントに設定している関数
const wikiData = () => {
  content.innerHTML = ""; //一旦js-wikipedia-bodyの中を空にする
  const inputValue = keyword.value; //Input要素に入力されたテキストを取得
  wikiFetch(inputValue);
};
btn.addEventListener("click", wikiData, false);
