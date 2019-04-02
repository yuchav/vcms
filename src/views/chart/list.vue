<style>
.el-tabs__header.is-top {
  margin-bottom: 50px;
}

</style>
<template>
  <div class="app-container">
    <h2>使用了基于antV的G2</h2>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="柱状图" name="first">
        <div id="first"></div>
      </el-tab-pane>
      <el-tab-pane label="饼状图" name="second">
        <div id="second"></div>
      </el-tab-pane>
      <el-tab-pane label="热力图" name="third">
        <div id="third"></div>
      </el-tab-pane>
      <el-tab-pane label="地图" name="fourth">
        <div id="fourth"></div>
      </el-tab-pane>
      <el-tab-pane label="关系图" name="fifth">
        <div id="fifth"></div>
      </el-tab-pane>
      <el-tab-pane label="词云" name="sixth">
        <div id="sixth"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getList } from '@/api/table'
import G2 from '@antv/g2';
import GeoJSON from './usa.geo.json';
import mapData from './world.geo.json';
import data from './earthquake.json';
import fifthData from './relationship-with-weight.json';
import sixthData from './world-population.json';

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      activeName: '',
      formInline: {
        user: '',
        region: ''
      },
      list: null,
      listLoading: true,
      centerDialogVisible: false,
      form: {},
    }
  },
  watch: {
    activeName(val) {
      setTimeout(() => {
        if (val === 'first') {
          this.initFirst();
        }
        if (val === 'second') {
          this.initSecond();
        }
        if (val === 'third') {
          this.initThird();
        }
        if (val === 'fourth') {
          this.initFourth();
        }

        if (val === 'fifth') {
          this.initFifth();
        }

        if (val === 'sixth') {
          this.initSixth();
        }
      }, 200)
    }
  },
  created() {
    this.activeName = 'first';
  },
  methods: {
    initSixth() {
      document.getElementById('sixth').innerHTML = '';
      var data = sixthData;

      function getTextAttrs(cfg) {
        return _.assign({}, cfg.style, {
          fillOpacity: cfg.opacity,
          fontSize: cfg.origin._origin.size,
          rotate: cfg.origin._origin.rotate,
          text: cfg.origin._origin.text,
          textAlign: 'center',
          fontFamily: cfg.origin._origin.font,
          fill: cfg.color,
          textBaseline: 'Alphabetic'
        });
      }

      // 给point注册一个词云的shape
      G2.Shape.registerShape('point', 'cloud', {
        drawShape: function drawShape(cfg, container) {
          var attrs = getTextAttrs(cfg);
          return container.addShape('text', {
            attrs: _.assign(attrs, {
              x: cfg.x,
              y: cfg.y
            })
          });
        }
      });
      var dv = new DataSet.View().source(data);
      var range = dv.range('value');
      var min = range[0];
      var max = range[1];
      dv.transform({
        type: 'tag-cloud',
        fields: ['x', 'value'],
        size: [window.innerWidth, window.innerHeight],
        font: 'Verdana',
        padding: 0,
        timeInterval: 5000, // max execute time
        rotate: function rotate() {
          var random = ~~(Math.random() * 4) % 4;
          if (random == 2) {
            random = 0;
          }
          return random * 90; // 0, 90, 270
        },
        fontSize: function fontSize(d) {
          if (d.value) {
            return (d.value - min) / (max - min) * (80 - 24) + 24;
          }
          return 0;
        }
      });
      var chart = new G2.Chart({
        container: 'sixth',
        width: window.innerWidth - 250,
        height: window.innerHeight - 200,
        padding: 0
      });
      chart.source(dv, {
        x: {
          nice: false
        },
        y: {
          nice: false
        }
      });
      chart.legend(false);
      chart.axis(false);
      chart.tooltip({
        showTitle: false
      });
      chart.coord().reflect();
      chart.point().position('x*y').color('category').shape('cloud').tooltip('value*category');
      chart.render();


    },
    initFifth() {
      document.getElementById('fifth').innerHTML = '';
      var data = fifthData;
      // arc diagram layout
      var ds = new DataSet();
      var dv = ds.createView().source(data, {
        type: 'graph',
        edges: function edges(d) {
          return d.links;
        }
      });
      dv.transform({
        type: 'diagram.arc',
        marginRatio: 0.5
        // sortBy: 'frequency' // id, weight, frequency, {function}
      });

      var chart = new G2.Chart({
        container: 'fifth',
        forceFit: true,
        height: window.innerHeight - 300
      });
      chart.legend(false);
      chart.tooltip({
        showTitle: false
      });

      var edgeView = chart.view();
      edgeView.coord('polar').reflect('y');
      edgeView.source(dv.edges);
      edgeView.axis(false);
      edgeView.edge().position('x*y').shape('arc').color('source').opacity(0.5).tooltip('source*target');

      var nodeView = chart.view();
      nodeView.coord('polar').reflect('y');
      nodeView.source(dv.nodes);
      nodeView.axis(false);
      nodeView.point().position('x*y').shape('circle').size('value').color('id').opacity(0.5).style({
        stroke: 'grey'
      }).label('name', {
        labelEmit: true
      });

      chart.render();
    },
    initFourth() {
      document.getElementById('fourth').innerHTML = '';
      var chart = new G2.Chart({
        container: 'fourth',
        forceFit: true,
        height: window.innerHeight - 300,
        padding: [0, 20, 40]
      });
      // force sync scales
      chart.scale({
        x: {
          sync: true,
          nice: false
        },
        y: {
          sync: true,
          nice: false
        }
      });
      chart.coord().reflect();
      chart.legend(false);
      chart.axis(false);

      // style the tooltip
      chart.tooltip({
        showTitle: false,
        containerTpl: '<div class="g2-tooltip"><table class="g2-tooltip-list"></table></div>',
        itemTpl: '<tr data-index="{index}"><td style="padding:5px;background-color:#545454;">{name}</td><td style="padding:5px;background-color:#fff;color:#000;">{value}</td></tr>',
        'g2-tooltip': {
          borderRadius: '2px',
          backgroundColor: '#DDDDDD',
          padding: 0,
          border: '1px solid #333'
        }
      });
      // data set
      var ds = new DataSet();

      // draw the map
      var dv = ds.createView('back').source(mapData, {
        type: 'GeoJSON'
      }).transform({
        type: 'geo.projection',
        projection: 'geoMercator',
        as: ['x', 'y', 'centroidX', 'centroidY']
      });
      var bgView = chart.view();
      bgView.source(dv);
      bgView.tooltip(false);
      bgView.polygon().position('x*y').style({
        fill: '#DDDDDD',
        stroke: '#b1b1b1',
        lineWidth: 0.5,
        fillOpacity: 0.85
      });

      // draw the bubble plot
      var userData = ds.createView().source(data);
      userData.transform({
        type: 'map',
        callback: function callback(obj) {
          var projectedCoord = dv.geoProjectPosition([obj.lng * 1, obj.lat * 1], 'geoMercator');
          obj.x = projectedCoord[0];
          obj.y = projectedCoord[1];
          obj.deaths = obj.deaths * 1;
          obj.magnitude = obj.magnitude * 1;
          return obj;
        }
      });
      var pointView = chart.view();
      pointView.source(userData);
      pointView.point().position('x*y').size('deaths', [2, 30]).shape('circle').opacity(0.45).color('#FF2F29').tooltip('date*location*lat*lng*deaths*magnitude');

      chart.render();

    },
    initThird() {
      document.getElementById('third').innerHTML = '';
      var userData = [];
      var geoDv = new DataSet.View().source(GeoJSON, {
        type: 'GeoJSON'
      }).transform({
        type: 'map',
        callback: function callback(row) {
          userData.push({
            longitude: row.centroidX,
            latitude: row.centroidY,
            name: row.name,
            value: Math.random() * (1000 - 1)
          });
          return row;
        }
      });

      var chart = new G2.Chart({
        container: 'third',
        forceFit: true,
        height: window.innerHeight - 300,
        padding: 0
      });
      chart.scale({
        latitude: {
          sync: true,
          nice: false
        },
        longitude: {
          sync: true,
          nice: false
        }
      });
      chart.legend(false);
      chart.axis(false);
      chart.tooltip(false);

      var geoView = chart.view();
      geoView.source(geoDv);
      geoView.polygon().position('longitude*latitude').color('grey').label('name', {
        offset: 0
      });

      var userView = chart.view();
      userView.source(userData);
      userView.heatmap().position('longitude*latitude').color('value', '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2').size(window.innerHeight / 20).style({
        blur: window.innerHeight / 15
      });
      chart.render();
    },
    initSecond() {
      document.getElementById('second').innerHTML = '';
      var _DataSet = DataSet,
        DataView = _DataSet.DataView;
      var _G = G2,
        Chart = _G.Chart;

      var data = [{
        "State": "AL",
        "Under 5 Years": 310504,
        "5 to 13 Years": 552339,
        "14 to 17 Years": 259034,
        "18 to 24 Years": 450818,
        "25 to 44 Years": 1231572,
        "45 to 64 Years": 1215966,
        "65 Years and Over": 641667
      }, {
        "State": "AK",
        "Under 5 Years": 52083,
        "5 to 13 Years": 85640,
        "14 to 17 Years": 42153,
        "18 to 24 Years": 74257,
        "25 to 44 Years": 198724,
        "45 to 64 Years": 183159,
        "65 Years and Over": 50277
      }, {
        "State": "AZ",
        "Under 5 Years": 515910,
        "5 to 13 Years": 828669,
        "14 to 17 Years": 362642,
        "18 to 24 Years": 601943,
        "25 to 44 Years": 1804762,
        "45 to 64 Years": 1523681,
        "65 Years and Over": 862573
      }, {
        "State": "AR",
        "Under 5 Years": 202070,
        "5 to 13 Years": 343207,
        "14 to 17 Years": 157204,
        "18 to 24 Years": 264160,
        "25 to 44 Years": 754420,
        "45 to 64 Years": 727124,
        "65 Years and Over": 407205
      }, {
        "State": "CA",
        "Under 5 Years": 2704659,
        "5 to 13 Years": 4499890,
        "14 to 17 Years": 2159981,
        "18 to 24 Years": 3853788,
        "25 to 44 Years": 10604510,
        "45 to 64 Years": 8819342,
        "65 Years and Over": 4114496
      }, {
        "State": "CO",
        "Under 5 Years": 358280,
        "5 to 13 Years": 587154,
        "14 to 17 Years": 261701,
        "18 to 24 Years": 466194,
        "25 to 44 Years": 1464939,
        "45 to 64 Years": 1290094,
        "65 Years and Over": 511094
      }, {
        "State": "CT",
        "Under 5 Years": 211637,
        "5 to 13 Years": 403658,
        "14 to 17 Years": 196918,
        "18 to 24 Years": 325110,
        "25 to 44 Years": 916955,
        "45 to 64 Years": 968967,
        "65 Years and Over": 478007
      }];
      var ages = ['Under 5 Years', '5 to 13 Years', '14 to 17 Years', '18 to 24 Years', '25 to 44 Years', '45 to 64 Years', '65 Years and Over'];
      var dv = new DataView();
      dv.source(data).transform({
        type: 'fold',
        fields: ages,
        key: 'age',
        value: 'population',
        retains: ['State']
      }).transform({
        type: 'map',
        callback: function callback(obj) {
          var key = obj.age;
          var type = void 0;
          if (key === 'Under 5 Years' || key === '5 to 13 Years' || key === '14 to 17 Years') {
            type = 'a';
          } else if (key === '18 to 24 Years') {
            type = 'b';
          } else if (key === '25 to 44 Years') {
            type = 'c';
          } else {
            type = 'd';
          }
          obj.type = type;
          return obj;
        }
      });
      var colorMap = {
        'Under 5 Years': '#E3F4BF',
        '5 to 13 Years': '#BEF7C8',
        '14 to 17 Years': '#86E6C8',
        '18 to 24 Years': '#36CFC9',
        '25 to 44 Years': '#209BDD',
        '45 to 64 Years': '#1581E6',
        '65 Years and Over': '#0860BF'
      };
      var chart = new Chart({
        container: 'second',
        forceFit: true,
        height: window.innerHeight - 300
      });
      chart.coord('polar', {
        innerRadius: 0.5
      });
      chart.source(dv, {
        population: {
          tickInterval: 1000000
        }
      });
      chart.axis('population', {
        label: {
          formatter: function formatter(val) {
            return val / 1000000 + 'M';
          }
        }
      });
      chart.legend({
        position: 'right'
      });
      chart.interval().position('State*population').color('age', function(age) {
        return colorMap[age];
      }).tooltip('age*population', function(age, population) {
        return {
          name: age,
          value: population
        };
      }).adjust([{
        type: 'dodge',
        dodgeBy: 'type', // 按照 type 字段进行分组
        marginRatio: 0 // 分组中各个柱子之间不留空隙
      }, {
        type: 'stack'
      }]);
      chart.render();
    },
    initFirst() {
      document.getElementById('first').innerHTML = '';
      var _DataSet = DataSet,
        DataView = _DataSet.DataView;
      var _G = G2,
        Chart = _G.Chart;

      var data = [{
        "State": "AL",
        "Under 5 Years": 310504,
        "5 to 13 Years": 552339,
        "14 to 17 Years": 259034,
        "18 to 24 Years": 450818,
        "25 to 44 Years": 1231572,
        "45 to 64 Years": 1215966,
        "65 Years and Over": 641667
      }, {
        "State": "AK",
        "Under 5 Years": 52083,
        "5 to 13 Years": 85640,
        "14 to 17 Years": 42153,
        "18 to 24 Years": 74257,
        "25 to 44 Years": 198724,
        "45 to 64 Years": 183159,
        "65 Years and Over": 50277
      }, {
        "State": "AZ",
        "Under 5 Years": 515910,
        "5 to 13 Years": 828669,
        "14 to 17 Years": 362642,
        "18 to 24 Years": 601943,
        "25 to 44 Years": 1804762,
        "45 to 64 Years": 1523681,
        "65 Years and Over": 862573
      }, {
        "State": "AR",
        "Under 5 Years": 202070,
        "5 to 13 Years": 343207,
        "14 to 17 Years": 157204,
        "18 to 24 Years": 264160,
        "25 to 44 Years": 754420,
        "45 to 64 Years": 727124,
        "65 Years and Over": 407205
      }, {
        "State": "CA",
        "Under 5 Years": 2704659,
        "5 to 13 Years": 4499890,
        "14 to 17 Years": 2159981,
        "18 to 24 Years": 3853788,
        "25 to 44 Years": 10604510,
        "45 to 64 Years": 8819342,
        "65 Years and Over": 4114496
      }, {
        "State": "CO",
        "Under 5 Years": 358280,
        "5 to 13 Years": 587154,
        "14 to 17 Years": 261701,
        "18 to 24 Years": 466194,
        "25 to 44 Years": 1464939,
        "45 to 64 Years": 1290094,
        "65 Years and Over": 511094
      }, {
        "State": "CT",
        "Under 5 Years": 211637,
        "5 to 13 Years": 403658,
        "14 to 17 Years": 196918,
        "18 to 24 Years": 325110,
        "25 to 44 Years": 916955,
        "45 to 64 Years": 968967,
        "65 Years and Over": 478007
      }];
      var ages = ['Under 5 Years', '5 to 13 Years', '14 to 17 Years', '18 to 24 Years', '25 to 44 Years', '45 to 64 Years', '65 Years and Over'];
      var dv = new DataView();
      dv.source(data).transform({
        type: 'fold',
        fields: ages,
        key: 'age',
        value: 'population',
        retains: ['State']
      }).transform({
        type: 'map',
        callback: function callback(obj) {
          var key = obj.age;
          var type = void 0;
          if (key === 'Under 5 Years' || key === '5 to 13 Years' || key === '14 to 17 Years') {
            type = 'a';
          } else if (key === '18 to 24 Years') {
            type = 'b';
          } else if (key === '25 to 44 Years') {
            type = 'c';
          } else {
            type = 'd';
          }
          obj.type = type;
          return obj;
        }
      });
      var colorMap = {
        'Under 5 Years': '#E3F4BF',
        '5 to 13 Years': '#BEF7C8',
        '14 to 17 Years': '#86E6C8',
        '18 to 24 Years': '#36CFC9',
        '25 to 44 Years': '#209BDD',
        '45 to 64 Years': '#1581E6',
        '65 Years and Over': '#0860BF'
      };
      var chart = new Chart({
        container: 'first',
        forceFit: true,
        height: window.innerHeight - 300,
        padding: [20, 160, 80, 60]
      });
      chart.source(dv, {
        population: {
          tickInterval: 1000000
        }
      });
      chart.axis('population', {
        label: {
          formatter: function formatter(val) {
            return val / 1000000 + 'M';
          }
        }
      });
      chart.legend({
        position: 'right'
      });
      chart.interval().position('State*population').color('age', function(age) {
        return colorMap[age];
      }).tooltip('age*population', function(age, population) {
        return {
          name: age,
          value: population
        };
      }).adjust([{
        type: 'dodge',
        dodgeBy: 'type', // 按照 type 字段进行分组
        marginRatio: 0 // 分组中各个柱子之间不留空隙
      }, {
        type: 'stack'
      }]);
      chart.render();
    },
    handleClick(val) {
      //console.log(val)
    },
  }
}

</script>
