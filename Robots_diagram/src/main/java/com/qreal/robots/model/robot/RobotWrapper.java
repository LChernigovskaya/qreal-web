/*
 * Copyright Denis Ageev
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

package com.qreal.robots.model.robot;

/**
 * Created by dageev on 28.03.15.
 */
public class RobotWrapper {
    private final Robot robot;
    private final RobotInfo robotInfo;
    private final String status;


    public RobotWrapper(Robot robot, RobotInfo robotInfo, String status) {
        this.robot = robot;
        this.robotInfo = robotInfo;
        this.status = status;
    }

    public RobotWrapper(Robot robot, String status) {
        this.robot = robot;
        this.status = status;
        this.robotInfo = null;

    }

    public RobotInfo getRobotInfo() {
        return robotInfo;
    }

    public Robot getRobot() {
        return robot;
    }

    public String getStatus() {
        return this.status;
    }
}
