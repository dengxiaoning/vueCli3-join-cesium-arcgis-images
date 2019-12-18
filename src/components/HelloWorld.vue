<template>
<div class="test-cesium">
  <div id="cesiumContainer"></div>
</div>
</template>

<script>

    export default {
        data () {
            return {
                viewer :'',
                tileset: '',
            }
        },
        methods:{
            printCamerInfo(){
                var _this = this;
                document.onkeydown = function (event) {
                    var e = event || window.event
                    if (e.ctrlKey && e.keyCode == 13) {
                        var camera = _this.viewer.scene.camera;
                        var heading = camera.heading;
                        var pitch = camera.pitch;
                        var roll = camera.roll;
                        var pos = camera.position;
                        console.log("选择弧度(heading,pitch,roll): heading:" + heading + ",pitch:" + pitch + ",roll:" + roll + "")

                        console.log("位置（x,y,z）   " + pos.x + "," + pos.y + "," + pos.z)
                    }
                }
            },
        },
        mounted (){
            //103.37324413479338, 29.544684360197113
            // var initialLon = 103.37324413479338;
            // var lat = 29.544684360197113;
            // var height = 10.0;
            // // 创建viewer实例
            this.viewer = new Cesium.Viewer('cesiumContainer', {
                // 需要进行可视化的数据源的集合
                animation: false, // 是否显示动画控件
                shouldAnimate: true,
                homeButton: false, // 是否显示Home按钮
                fullscreenButton: false, // 是否显示全屏按钮
                baseLayerPicker: true, // 是否显示图层选择控件
                geocoder: false, // 是否显示地名查找控件
                timeline: false, // 是否显示时间线控件
                sceneModePicker: true, // 是否显示投影方式控件
                navigationHelpButton: false, // 是否显示帮助信息控件
                infoBox: false, // 是否显示点击要素之后显示的信息
                requestRenderMode: true, // 启用请求渲染模式
                scene3DOnly: false, // 每个几何实例将只能以3D渲染以节省GPU内存
                sceneMode: 3, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
                fullscreenElement: document.body, // 全屏时渲染的HTML元素 暂时没发现用处
            })
            // 去除版权信息
            this.viewer._cesiumWidget._creditContainer.style.display = 'none';

            // Cartesian 方式确定位置
            this.viewer.camera.setView({
                destination :  Cesium.Cartesian3.fromDegrees(103.37324413479338,29.544684360197113,83450), // 设置位置
                orientation: {
                    heading : Cesium.Math.toRadians(0.049206089012050924), // 方向
                    pitch : Cesium.Math.toRadians(-90.0),// 倾斜角度
                    roll : 0.00023724144623749055
                }
            });

            var layers = this.viewer.scene.imageryLayers;
            // let layer_arcgis  = new Cesium.ArcGisMapServerImageryProvider({
            //     url:"http://localhost:28080/geowebcache/demo/fsRoads?gridSet=EPSG:4326_fsRoads&format=image/png",
            // })

           let arcgis_layer = new Cesium.WebMapServiceImageryProvider({
                url: "http://localhost:28080/geowebcache/service/wms",
                layers: 'EPSG:4326_fsRoads',
                parameters: {
                    'LAYERS': 'fsRoads',
                    'FORMAT': 'image/png',
                    'SRS': 'EPSG:4326',
                    'VERSION': '1.1.1'
                }
            });

            // http://localhost:8080/geowebcache/service/wms

            layers.addImageryProvider(arcgis_layer);
            // 相机飞入
            // this.viewer.camera.flyTo({
            //     destination : Cesium.Cartesian3.fromDegrees(103.37324413479338,29.544684360197113,83450),
            //     orientation : {
            //         heading : Cesium.Math.toRadians(0.049206089012050924),
            //         pitch : Cesium.Math.toRadians(-90),
            //         roll : 0.00023724144623749055
            //     }
            // });

              // ctrl + enter 键 获取 弧度
            // 选择弧度(heading,pitch,roll): heading:6.214649915812,pitch:-1.518268914000906,roll:6.2831399643272405
            //   HelloWorld.vue?140d:29 位置（x,y,z）   312.9872054744046,-4554.799193550833,85739.86564729922
            this. printCamerInfo()

        }
    }



</script>
<style>
.test-cesium{
  width: 100%;
  height: 100%;
}
</style>
