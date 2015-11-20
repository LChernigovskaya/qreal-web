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

class StageScroller {

    private ZOOM: number = 2/3;
    private stage;

    constructor() {
        this.stage = $("#twoDModel_stage");
    }

    public scrollToPoint(x: number, y: number) {
        var width: number = this.stage.width();
        var height: number = this.stage.height();

        var offsetX = x * this.ZOOM - width / 2;
        var offsetY = y * this.ZOOM - height / 2;

        this.stage.scrollLeft(offsetX);
        this.stage.scrollTop(offsetY);
    }

}