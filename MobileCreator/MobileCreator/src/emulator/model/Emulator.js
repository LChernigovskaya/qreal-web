define(["require", "exports", "utils/log/Log", "emulator/model/ui/Button", "emulator/model/ui/TextView", "emulator/model/ui/LinearLayout", "emulator/model/attributes/ButtonTag", "emulator/model/attributes/LinearLayoutTag", "emulator/model/attributes/TextViewTag"], function(require, exports, __mLog__, __mButton__, __mTextView__, __mLinearLayout__, __mButtonTag__, __mLinearLayoutTag__, __mTextViewTag__) {
    var mLog = __mLog__;

    var mButton = __mButton__;

    var mTextView = __mTextView__;

    var mLinearLayout = __mLinearLayout__;

    var mButtonTag = __mButtonTag__;

    var mLinearLayoutTag = __mLinearLayoutTag__;

    var mTextViewTag = __mTextViewTag__;

    var Emulator = (function () {
        function Emulator() {
            this.logger = new mLog.Logger("Emulator");
        }
        Emulator.instance = new Emulator();
        Emulator.prototype.createView = function () {
            this.logger.log("createView");
            var content = $("#emulator");
            content.children().remove();
            var bttag1 = new mButtonTag.ButtonTag();
            bttag1.Id = "button1";
            bttag1.Text = "button1";
            var button1 = new mButton.Button(bttag1);
            var bttag2 = new mButtonTag.ButtonTag();
            bttag2.Id = "button2";
            bttag2.Text = "button2";
            var button2 = new mButton.Button(bttag2);
            var bttag3 = new mButtonTag.ButtonTag();
            bttag3.Id = "button3";
            bttag3.Text = "button3";
            var button3 = new mButton.Button(bttag3);
            var bttag4 = new mButtonTag.ButtonTag();
            bttag4.Id = "button4";
            bttag4.Text = "button4";
            var button4 = new mButton.Button(bttag4);
            var bttag5 = new mButtonTag.ButtonTag();
            bttag5.Id = "button5";
            bttag5.Text = "button5";
            var button5 = new mButton.Button(bttag5);
            var bttag6 = new mButtonTag.ButtonTag();
            bttag6.Id = "button6";
            bttag6.Text = "button6";
            var button6 = new mButton.Button(bttag6);
            var tag4 = new mLinearLayoutTag.LinearLayoutTag();
            tag4.Id = "linear1";
            tag4.Orientation = mLinearLayoutTag.LinearLayoutTag.Horizontal;
            tag4.Background = "#0f0";
            var layout = new mLinearLayout.LinearLayout(tag4);
            var tag5 = new mTextViewTag.TextViewTag();
            tag5.Id = "text1";
            tag5.Text = "text1";
            var label1 = new mTextView.TextView(tag5);
            var tag6 = new mLinearLayoutTag.LinearLayoutTag();
            tag6.Id = "linear2";
            tag6.Orientation = mLinearLayoutTag.LinearLayoutTag.Horizontal;
            tag6.Background = "#00f";
            var layout2 = new mLinearLayout.LinearLayout(tag6);
            var tag7 = new mTextViewTag.TextViewTag();
            tag7.Id = "text2";
            tag7.Text = "text2";
            var label2 = new mTextView.TextView(tag7);
            var tag8 = new mTextViewTag.TextViewTag();
            tag8.Id = "text2";
            tag8.Text = "text2";
            var label3 = new mTextView.TextView(tag8);
            var tag9 = new mTextViewTag.TextViewTag();
            tag9.Id = "text3";
            tag9.Text = "text3";
            var label4 = new mTextView.TextView(tag9);
            var tag10 = new mTextViewTag.TextViewTag();
            tag10.Id = "text4";
            tag10.Text = "text4";
            var label5 = new mTextView.TextView(tag10);
            layout2.addChild(label2);
            layout2.addChild(label3);
            layout2.addChild(label4);
            layout2.addChild(label5);
            layout.addChild(button1);
            layout.addChild(button2);
            layout.addChild(button3);
            layout.addChild(button4);
            layout.addChild(button5);
            layout.addChild(button6);
            var $layout = layout.$Control;
            content.append($layout);
            layout.create();
            content.append($('<button>hehe</button>'));
            content.trigger('create');
        };
        return Emulator;
    })();
    exports.Emulator = Emulator;    
})
