const googleTrends = require('google-trends-api');
var NodeGeocoder = require('node-geocoder');
exports.cities = [ 'Абакан', 'Альметьевск', 'Ангарск', 'Архангельск', 'Астрахань', 'Балашиха', 'Барнаул', 'Белгород', 'Благовещенск', 'Большой Сочи', 'Борзовая Заимка', 'Брянск', 'Великий Новгород', 'Владивосток', 'Владимир', 'Волгоград', 'Вологда', 'Воронеж', 'Грозный', 'Дальнее', 'Душкино', 'Екатеринбург', 'Зеленоград', 'Зеленый город', 'Иваново', 'Ижевск', 'Иркутск', 'Йошкар-Ола', 'Казань', 'Калининград', 'Калуга', 'Кемерово', 'Киров', 'Комсомольск-на-Амуре', 'Королев', 'Кострома', 'Краснодар', 'Красноярск', 'Курган', 'Курск', 'Липецк', 'Люберцы', 'Магнитогорск', 'Махачкала', 'Москва', 'Мурманск', 'Мытищи', 'Набережные Челны', 'Нижневартовск', 'Нижний Новгород', 'Нижний Тагил', 'Новокузнецк', 'Новосибирск', 'Одинцово', 'Ольгино', 'Омск', 'Оренбург', 'Орёл', 'Пенза', 'Перекатный', 'Пермь', 'Песчаный', 'Петергоф', 'Петрозаводск', 'Петропавловск-Камчатский', 'Подольск', 'Псков', 'Пушкин', 'Пятигорск', 'Ростов-на-Дону', 'Рязань', 'Самара', 'Санкт-Петербург', 'Саранск', 'Саратов', 'Смоленск', 'Ставрополь', 'Стерлитамак', 'Сургут', 'Сыктывкар', 'Таганрог', 'Тамбов', 'Тверь', 'Тольятти', 'Томск', 'Тула', 'Тюмень', 'Улан-Удэ', 'Ульяновск', 'Уссурийск', 'Уфа', 'Хабаровск', 'Чебоксары', 'Челябинск', 'Череповец', 'Чита', 'Яблоновский', 'Якутск', 'Ярославль' ];

function citiesByDiseases(diseases, threshold, years) {
  result = {}
  var cnt = diseases.length;
  var promises = [];
  diseases.forEach(disease => {
    promises.push(
      googleTrends.interestByRegion({keyword: disease, hl:'RU', geo: 'RU', startTime: new Date(Date.now() - (years*365 * 24 * 60 * 60 * 1000)), resolution: 'CITY'})
        .then((res) => {
          res = JSON.parse(res);
          let data = res['default']['geoMapData'];
          let cities = data.map((obj) => {return obj['geoName']});
          cities.forEach(city => {
            if (city in result) {
              ++result[city];
            } else {
              result[city] = 1;
            }
          });
        }).catch((err) => {})
    );
  });
  return Promise.all(promises).then(() => {
    cities = []
    for (var key in result) {
      if (result[key] >= threshold) {
        cities.push(key);
      }
    }
    return cities;
  });
}

exports.diseases = ["абсцесс", "ангина", "грипп", "гипертония", "сахарный диабет", "язва желудка", "кариес", "аллергии", "СПИД", "туберкулез", "депрессия", "диарея", "гепатит", "ОРВИ"];
// citiesByDiseases(diseases, 4, 20).then((cities) => {
  // console.log(cities.sort());
  // console.log(cities.length);
// });


function distance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist;
  }
}

function getGeo(city) {
  let options = {
    provider: 'openstreetmap',
    httpAdapter: 'https',
    language: 'RU',
  };
  let geocoder = NodeGeocoder(options);
  return geocoder.geocode(city)
    .then(function(res) {
      return {lat: res[0].latitude, lon: res[0].longitude};
    })
    .catch(function(err) {
    });
}

function score(city, query) {
  return googleTrends.interestByRegion({keyword: query, hl:'RU', geo: 'RU', startTime: new Date(Date.now() - (20*365 * 24 * 60 * 60 * 1000)), resolution: 'CITY'})
    .then((res) => {
      console.log("res   ============    " + query);
      console.log(res);
      res = JSON.parse(res);
      // console.log(query);
      // console.log(JSON.stringify(res));
      let data = res['default']['geoMapData'];
      let scores = {};
      data.forEach(obj => {
        scores[obj['geoName']] = obj['value'];
      });
      // console.log([query, scores[city]]);
      if (city in scores) {
        return scores[city];
      }
      return -1;
    }).catch((err) => {
      return -1;
    })
}

exports.compare = async function(city, query1, query2) {
  let ar = [-1, -1];
  let ss = null;
  ar[0] = await score(city, query1)[0];
  ar[1] = await score(city, query2)[0];
  ss = await score(city, [query1, query2]);
  // return Promise.all([
  //   score(city, query1).then(score1 => {
  //     ar[0] = score1[0];
  //   }),
  //   score(city, query2).then(score2 => {
  //     ar[1] = score2[0];
  //   }),
  //   score(city, [query1, query2]).then(score_ => {
  //     ss = score_;
  //   })
  // ]
  // ).then(() => {
    if (ar[0] > ar[1]) return 1;
    if (ar[0] < ar[1]) return -1;
    if (ss[0] > ss[1]) return 1;
    if (ss[0] < ss[1]) return -1;
    return 0;
  // });
}

// compare('Хабаровск', "двгупс", "тогу").then((cmpres) => {
  // console.log(cmpres);
// })

exports.compare_cities = function(disease, city1, city2) {
  return googleTrends.interestByRegion({keyword: disease, category: 45, hl:'RU', geo: 'RU', startTime: new Date(Date.now() - (20*365 * 24 * 60 * 60 * 1000)), resolution: 'CITY'})
  .then((res) => {
    res = JSON.parse(res);
    let score1 = 0;
    let score2 = 0
    // console.log(JSON.stringify(res, null, 2));
    let data = res['default']['geoMapData'];
    let scores = {};
    data.forEach(obj => {
      scores[obj['geoName']] = obj['value'][0];
    });
    // console.log(scores);
    if (city1 in scores) {
      score1 = scores[city1];
    }
    if (city2 in scores) {
      score2 = scores[city2];
    };
    if (score1 > score2) {
      return 1;
    }
    if (score1 < score2) {
      return -1;
    }
    return 0;
  }).catch((err) => {
    return 0;
  })
}

// compare_cities("чесотка", "Москва", "Санкт-Петербург").then(city => {
//   console.log(city);
// })

// googleTrends.interestByRegion({keyword: ['биткоин', 'микрозаймы'], hl:'RU', geo: 'RU', startTime: new Date(Date.now() - (5*365 * 24 * 60 * 60 * 1000)), resolution: 'CITY'})
//   .then((res) => {
//     console.log(res);
//   })