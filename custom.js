function limitTextArea(element) {
    var charlimit = 70;
    var lines = element.innerHTML.split('<br>');
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].length <= charlimit) continue;
        var j = 0; space = charlimit;
        while (j++ <= charlimit) {
            if (lines[i].charAt(j) === ' ') space = j;
        }
        lines[i + 1] = lines[i].substring(space + 1) + (lines[i + 1] || "");
        lines[i] = lines[i].substring(0, space);
    }
    element.innerHTML = lines.slice(0, 100).join('<br>');
}


function ApplyLineBreaks(strTextAreaId) {
    var oTextarea = document.getElementById(strTextAreaId);
    if (oTextarea.wrap) {
        oTextarea.setAttribute("wrap", "off");
    }
    else {
        oTextarea.setAttribute("wrap", "off");
        var newArea = oTextarea.cloneNode(true);
        newArea.value = oTextarea.innerHTML;
        oTextarea.parentNode.replaceChild(newArea, oTextarea);
        oTextarea = newArea;
    }

    var strRawValue = oTextarea.innerHTML;
    oTextarea.innerHTML = "";
    var nEmptyWidth = oTextarea.scrollWidth;
    var nLastWrappingIndex = -1;
    for (var i = 0; i < strRawValue.length; i++) {
        var curChar = strRawValue.charAt(i);
        if (curChar == ' ' || curChar == '-' || curChar == '+')
            nLastWrappingIndex = i;
        oTextarea.innerHTML += curChar;
        if (oTextarea.scrollWidth > nEmptyWidth) {
            var buffer = "";
            if (nLastWrappingIndex >= 0) {
                for (var j = nLastWrappingIndex + 1; j < i; j++)
                    buffer += strRawValue.charAt(j);
                nLastWrappingIndex = -1;
            }
            buffer += curChar;
            oTextarea.innerHTML = oTextarea.innerHTML.substr(0, oTextarea.innerHTML.length - buffer.length);
            oTextarea.innerHTML += "\n" + buffer;
        }
    }
    oTextarea.setAttribute("wrap", "");
    oTextarea.innerHTML = oTextarea.innerHTML.replace(new RegExp("\\n", "g"), "<br />");
}


function wordWrap(str, maxWidth) {
    var newLineStr = "\n"; done = false; res = '';
    while (str.length > maxWidth) {
        found = false;
        // Inserts new line at first whitespace of the line
        for (i = maxWidth - 1; i >= 0; i--) {
            if (testWhite(str.charAt(i))) {
                res = res + [str.slice(0, i), newLineStr].join('');
                str = str.slice(i + 1);
                found = true;
                break;
            }
        }
        // Inserts new line at maxWidth position, the word is too long to wrap
        if (!found) {
            res += [str.slice(0, maxWidth), newLineStr].join('');
            str = str.slice(maxWidth);
        }

    }

    return res + str;
}

function testWhite(x) {
    var white = new RegExp(/^\s$/);
    return white.test(x.charAt(0));
};



function getInputSelection(el) {
    var start = 0, end = 0, normalizedValue, range,
        textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        range = document.selection.createRange();

        if (range && range.parentElement() == el) {
            len = el.value.length;
            normalizedValue = el.value.replace(/\r\n/g, "\n");

            // Create a working TextRange that lives only in the input
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());

            // Check if the start and end of the selection are at the very end
            // of the input, since moveStart/moveEnd doesn't return what we want
            // in those cases
            endRange = el.createTextRange();
            endRange.collapse(false);

            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    }

    return {
        start: start,
        end: end
    };
}

function replaceSelectedText(el, text) {
    var sel = getInputSelection(el), val = el.value;
    el.value = val.slice(0, sel.start) + "<font color=\"#ffff00\"><b>" + val.slice(sel.start, sel.end) + "</b></font>" + val.slice(sel.end);
}

function gantiText(idText) {
    var el = document.getElementById(idText);
    replaceSelectedText(el, "[NEW TEXT]");
}

function lirikText(textData, idText) {
    temp = ""
    temp2 = "grabage"
    data = textData.replaceAll("<br>", "<div>").replaceAll("<div>", "|" + idText + "\n").replaceAll("</div>", "")
    data = data.replace(/\n*$/, "")
    data.split("\n").forEach(function (item) {

        temp += "|" + idText + "\n"

    })


    // Atasi newline
    // var replace = "\|"+idText+"\\n*$";
    // var re = new RegExp(replace,"");
    // temp = temp.replace(last, "")

    // temp = temp.replace(/\|*$/, "")
    // if (isNaN(temp.substr(temp.length - 1))) {
    //     temp += "|" + idText
    // }
    // temp += "\n"
    return temp
}


function removeHTML(str) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || "";
}