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

declare interface TwoDModelEngineFacade {

    setDrawLineMode(): void;
    setDrawWallMode(): void;
    setDrawPencilMode(): void;
    setDrawEllipseMode(): void;
    setNoneMode(): void;
    openDiagramEditor(): void;
    showCheckResult(result): void;
    stopPlay(): void;
    followRobot(value: boolean): void;

}

declare class TwoDModelEngineFacadeImpl implements TwoDModelEngineFacade {

    setDrawLineMode(): void;
    setDrawWallMode(): void;
    setDrawPencilMode(): void;
    setDrawEllipseMode(): void;
    setNoneMode(): void;
    openDiagramEditor(): void;
    showCheckResult(result): void;
    stopPlay(): void;
    followRobot(value: boolean): void;

}

declare class Motor {

    public getPower(): number;
    public setPower(power: number): void;

}