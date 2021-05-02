//MCCScript 1.0

/* This is a sample script that will load a ChatBot into Minecraft Console Client
 * Simply execute the script once with /script or the script scheduler to load the bot */

MCC.LoadBot(new WallBot());

//MCCScript Extensions

/* The ChatBot class must be defined as an extension of the script in the Extensions section
 * The class can override common methods from ChatBot.cs, take a look at MCC's source code */

public class WallBot : ChatBot
{
    public override void Initialize(){
        LogToConsole("Chat Successfully Initiated!");
    }
   

//MCCScript Extensions
    private string server = "Lava";
    //Bot token to prevent people spamming, create your own by a random generator or just text. Needs to be the same as in the discord bot config.
    private string token = "";
    void sendPost(string postType, string message, string color){
        var request = (System.Net.HttpWebRequest)System.Net.WebRequest.Create("http://localhost:8080");
        request.Method = "POST";
        request.ContentType = "application/json";

        using (var streamWriter = new StreamWriter(request.GetRequestStream()))
        {
            string json = "{\"postType\": \"" + postType + "\", \"message\": \"" + message + "\", \"server\": \"" + server + "\", \"token\": \"" + token + "\", \"color\": \"" + color + "\"}";
            streamWriter.Write(json);
        }

        var httpResponse = (System.Net.HttpWebResponse)request.GetResponse();
        Console.WriteLine(httpResponse);
    }


    private int bah = 0;
    private string bahMessage = "";
    private int interMerchant = 0;
    private int slotCredit = 0;
    public override void GetText(string text)
    {
        text = GetVerbatim(text);

        if(text.Contains("* Black Market Auction *")){
            bah = 1;
        }
        if(bah > 0 && bah < 5){
            bahMessage = bahMessage + text + "\\n";
            bah++;
            if(bah == 5){
                sendPost("Black Market Auction", bahMessage, "#FFAA00");
                bah = 0;
                bahMessage = "";
            }
        }
        if(interMerchant == 1){
            sendPost("Interstellar Merchant", text, "#00AAAA");
            interMerchant = 0;
        }
        if(slotCredit == 1){
            sendPost("Slot Credit Shop", text, "#FFFF55");
            slotCredit = 0;
        }
        if(text.Contains("(!) The Black Market Merchant")){
            interMerchant = 1;
        }
        if(text.Contains("(!) The /slot Credit Shop has been restocked with:")){
            slotCredit = 1;
        }
    }
}
