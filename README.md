# S-BA (Smart Bicycle Assistant)


![image](https://github.com/Smart-Bicycle-Assistant/sba-frontend-web/assets/86648265/439df8da-7b4c-40e5-8ea8-392d80e3cfa6)

## 👩🏻‍💻 프로젝트 개요
<b>S-BA(Smart Bicycle Assistant)</b>는 자전거에 특화된 All-In-One 통합 애플리케이션입니다. 

기존 자전거 관련 애플리케이션은 각각 장단점이 존재합니다. 네비게이션 기능이 필요하다면 카카오 맵, 주행에 집중하고 싶다면 스트라바, 삼성헬스 등을 쓰게 됩니다. 그러나 이렇게 애플리케이션을 나눠서 쓰게 되면 주행 기록이 여러 앱에 나눠서 저장되므로 자전거 소모품의 수명 관리에 어려움이 있습니다. 또한 이러한 애플리케이션은 자전거 주행 중에 사용자에게 화면 조작을 요구하여 위험한 로직이 존재합니다. 따라서 기존 자전거 관련 애플리케이션의 단점을 개선하고 장점을 모두 통합한 단일 앱을 제작하고 더 나아가 자전거 유지 보수 기능, 자전거 주행을 보조하는 단체 라이딩 추천 기능, 후방 차량 감지 기능 등 자전거에 유용한 새로운 기능 3가지를 탑재하여 더욱 사용성 있는 앱을 개발하고자 하였습니다.

<br />

## ⚒️ 기술 스택
### FE
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/zustand-764ABC?style=for-the-badge&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>

### 외부 라이브러리
🔗 <a href="https://leafletjs.com/">Leaflet</a><br/>
🔗 <a href="https://www.openstreetmap.org/">Openstreetmap</a><br/>
🔗 <a href="https://apis.map.kakao.com/web/">카카오 Map</a><br/>
🔗 <a href="https://openrouteservice.org/">Openrouteservice</a>

<br />

## 📁 팀원 정보

 <table align="justify">
<thead>
<tr>
<th style="text-align:left">Team</th>
<th style="text-align:left">Name</th>
<th style="text-align:left">Position</th>
<th style="text-align:left">E-Mail</th>
<th style="text-align:left">Github</th>
</tr> 
</thead>
<tbody>
     <tr>
<td style="text-align:left">Team</td>
<td style="text-align:left">김윤아</td>
<td style="text-align:left">FrontEnd Developer</td>
<td style="text-align:left">hanuuny@gmail.com</td>
<td style="text-align:left"><a href="https://github.com/anttiey">
<img src="http://img.shields.io/badge/hanuuny-655ced?style=social&logo=github&color=informational" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
</a></td>
</tr>
 <tr>
<td style="text-align:left">Team</td>
<td style="text-align:left">정희수</td>
<td style="text-align:left">FrontEnd Developer</td>
<td style="text-align:left">s007kk@ajou.ac.kr</td>
<td style="text-align:left"><a href="https://github.com/heeeeee0129">
<img src="http://img.shields.io/badge/heeeeee0129-655ced?style=social&logo=github&color=informational" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
</a></td>
</tr>
</tbody>
</table>

<br />

## 📁 폴더 구조
```
📦 src
 ┣ 📂 apis
 ┣ 📂 assets
 ┣ 📂 components
 ┃ ┣ 📂 bicycle
 ┃ ┣ 📂 common
 ┃ ┣ 📂 management
 ┃ ┣ 📂 record
 ┃ ┣ 📂 register
 ┃ ┗ 📂 riding
 ┣ 📂 data
 ┣ 📂 hooks
 ┣ 📂 pages
 ┃ ┣ 📂 bicycle
 ┃ ┣ 📂 management
 ┃ ┣ 📂 mypage
 ┃ ┣ 📂 record
 ┃ ┣ 📂 riding
 ┃ ┣ 📂 user
 ┣ 📂 store
 ┣ 📂 types
 ┗ 📂 utils
 ```

