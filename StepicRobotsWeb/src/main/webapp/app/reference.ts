/*
* Copyright Vladimir Zakharov
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/// <reference path="twoDModel/implementations/robotModel/robotParts/DeviceImpl.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/AbstractSensor.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/ScalarSensor.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/VectorSensor.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/AccelerometerSensor.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/Button.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/ColorSensor.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/ColorSensorBlue.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/ColorSensorFull.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/ColorSensorGreen.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/ColorSensorPassive.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/ColorSensorRed.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/Display.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/EncoderSensor.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/GyroscopeSensor.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/LightSensor.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/Motor.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/RangeSensor.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/SoundSensor.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/Speaker.ts" />
/// <reference path="twoDModel/implementations/robotModel/robotParts/TouchSensor.ts" />
/// <reference path="twoDModel/implementations/engine/items/regions/RegionItem.ts" />

/// <reference path="twoDModel/implementations/robotModel/CommonRobotModelImpl.ts" />
/// <reference path="twoDModel/implementations/robotModel/DevicesConfigurationProvider.ts" />
//grunt-start
/// <reference path="RootDiagramController.ts" />
/// <reference path="XmlHttpFactory.ts" />
/// <reference path="checker/CheckerController.ts" />
/// <reference path="constants/GeneralConstants.ts" />
/// <reference path="diagram/UIDGenerator.ts" />
/// <reference path="diagram/controllers/DiagramController.ts" />
/// <reference path="diagram/loaders/DiagramLoader.ts" />
/// <reference path="diagram/loaders/ElementsTypeLoader.ts" />
/// <reference path="diagram/managers/ExportManager.ts" />
/// <reference path="diagram/managers/PropertyManager.ts" />
/// <reference path="diagram/managers/VariantListManager.ts" />
/// <reference path="diagram/models/DefaultDiagramNode.ts" />
/// <reference path="diagram/models/DiagramElement.ts" />
/// <reference path="diagram/models/DiagramNode.ts" />
/// <reference path="diagram/models/DiagramPaper.ts" />
/// <reference path="diagram/models/Link.ts" />
/// <reference path="diagram/models/RobotsDiagramNode.ts" />
/// <reference path="diagram/models/SubprogramDiagramNode.ts" />
/// <reference path="diagram/models/Variant.ts" />
/// <reference path="diagram/types/NodeType.ts" />
/// <reference path="diagram/types/NodeTypesMap.ts" />
/// <reference path="diagram/types/PropertiesMap.ts" />
/// <reference path="diagram/types/PropertiesPack.ts" />
/// <reference path="diagram/types/Property.ts" />
/// <reference path="twoDModel/implementations/engine/Runner.ts" />
/// <reference path="twoDModel/implementations/engine/StageScroller.ts" />
/// <reference path="twoDModel/implementations/engine/TwoDModelEngineFacadeImpl.ts" />
/// <reference path="twoDModel/implementations/engine/items/CubicBezierItemImpl.ts" />
/// <reference path="twoDModel/implementations/engine/items/EllipseItemImpl.ts" />
/// <reference path="twoDModel/implementations/engine/items/LineItemImpl.ts" />
/// <reference path="twoDModel/implementations/engine/items/PencilItemImpl.ts" />
/// <reference path="twoDModel/implementations/engine/items/RobotItemImpl.ts" />
/// <reference path="twoDModel/implementations/engine/items/SensorItem.ts" />
/// <reference path="twoDModel/implementations/engine/items/SonarSensorItem.ts" />
/// <reference path="twoDModel/implementations/engine/items/StartPositionItem.ts" />
/// <reference path="twoDModel/implementations/engine/items/WallItemImpl.ts" />
/// <reference path="twoDModel/implementations/engine/items/regions/EllipseRegion.ts" />
/// <reference path="twoDModel/implementations/engine/items/regions/RectangularRegion.ts" />
/// <reference path="twoDModel/implementations/engine/model/Constants.ts" />
/// <reference path="twoDModel/implementations/engine/model/DisplayWidget.ts" />
/// <reference path="twoDModel/implementations/engine/model/LedWidget.ts" />
/// <reference path="twoDModel/implementations/engine/model/Marker.ts" />
/// <reference path="twoDModel/implementations/engine/model/ModelImpl.ts" />
/// <reference path="twoDModel/implementations/engine/model/RobotModelImpl.ts" />
/// <reference path="twoDModel/implementations/engine/model/SensorsConfiguration.ts" />
/// <reference path="twoDModel/implementations/engine/model/WorldModelImpl.ts" />
/// <reference path="twoDModel/implementations/robotModel/DeviceInfoImpl.ts" />
/// <reference path="twoDModel/implementations/robotModel/PortInfoImpl.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/TrikRobotModelBase.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/parts/TrikColorSensor.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/parts/TrikDisplay.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/parts/TrikGamepadButton.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/parts/TrikGamepadConnectionIndicator.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/parts/TrikGamepadPad.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/parts/TrikGamepadPadPressSensor.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/parts/TrikGamepadWheel.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/parts/TrikInfraredSensor.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/parts/TrikLed.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/parts/TrikLineSensor.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/parts/TrikMotionSensor.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/parts/TrikObjectSensor.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/parts/TrikPowerMotor.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/parts/TrikServoMotor.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/parts/TrikShell.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/parts/TrikSonarSensor.ts" />
/// <reference path="twoDModel/implementations/robotModel/TrikKit/parts/TrikSpeaker.ts" />
/// <reference path="twoDModel/implementations/robotModel/TwoDRobotModel.ts" />
/// <reference path="twoDModel/interfaces/engine/TwoDModelEngineFacade.ts" />
/// <reference path="twoDModel/interfaces/engine/items/AbstractItem.ts" />
/// <reference path="twoDModel/interfaces/engine/items/ColorFieldItem.ts" />
/// <reference path="twoDModel/interfaces/engine/items/CubicBezierItem.ts" />
/// <reference path="twoDModel/interfaces/engine/items/EllipseItem.ts" />
/// <reference path="twoDModel/interfaces/engine/items/LineItem.ts" />
/// <reference path="twoDModel/interfaces/engine/items/PencilItem.ts" />
/// <reference path="twoDModel/interfaces/engine/items/RobotItem.ts" />
/// <reference path="twoDModel/interfaces/engine/items/WallItem.ts" />
/// <reference path="twoDModel/interfaces/engine/model/Model.ts" />
/// <reference path="twoDModel/interfaces/engine/model/RobotModel.ts" />
/// <reference path="twoDModel/interfaces/engine/model/Settings.ts" />
/// <reference path="twoDModel/interfaces/engine/model/WorldModel.ts" />
/// <reference path="twoDModel/interfaces/robotModel/CommonRobotModel.ts" />
/// <reference path="twoDModel/interfaces/robotModel/DeviceInfo.ts" />
/// <reference path="twoDModel/interfaces/robotModel/PortInfo.ts" />
/// <reference path="twoDModel/interfaces/robotModel/RobotModelInterface.ts" />
/// <reference path="twoDModel/interfaces/robotModel/robotParts/Device.ts" />
/// <reference path="twoDModel/types/Direction.ts" />
/// <reference path="twoDModel/types/RGBAColor.ts" />
/// <reference path="twoDModel/types/ReservedVariableType.ts" />
/// <reference path="twoDModel/types/TwoDPosition.ts" />
/// <reference path="utils/ColorUtils.ts" />
/// <reference path="utils/MathUtils.ts" />
/// <reference path="vendor.d.ts" />
//grunt-end