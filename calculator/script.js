function getHistory()
{
    return document.getElementById("history-value").innerText;
}
function printHistory(num)
{
    document.getElementById("history-value").innerText = num;
}

function getOutput()
{
    return document.getElementById("output-value").innerText;
}
function printOutput(num)
{
    document.getElementById("output-value").innerText = getFormattedNumber(num);
}
function getFormattedNumber(num)
{
    if(num == "-")
    {
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}
//when numbers are input, they will need to be reversed for the output
function reverseNumberFormat(num)
{
    return Number(num.replace(/,/g,''));
}

var operator = document.getElementsByClassName("operator");
for(var i = 0; i<operator.length;i++)
{
    operator[i].addEventListener('click',function()
    {
        if(this.id=="clear")
        {
            printHistory("");
            printOutput("");
        }

        else if(this.id=="backspace")
        {
            var output= reverseNumberFormat(getOutput()).toString();
            if(output)
            {
                output= output.substr(0,output.length-1);
                printOutput(output);
            }
        }
        else
        {
            var output = getOutput();
            var history = getHistory();
            if(output =="" && history!="")
            {
                if(isNaN(history[history.length-1]))//last character
                {
                    history= history.substr(0,history.length-1);
                }
            }
            if(output!="" || history!="")
            {
                output =  output ==""?
                    reverseNumberFormat(output):
                    history+=output;                
                if(this.id=="=") //process expression
                {
                    var result = eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else
                {
                    history+=this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

var number = document.getElementsByClassName("number");
for(var i = 0; i<number.length;i++)
{
    number[i].addEventListener('click',function()
    {
        var output = reverseNumberFormat(getOutput());
        if(output!=NaN)//its a number
        {
            output+=this.id;
        }
        printOutput(output);
    });
}