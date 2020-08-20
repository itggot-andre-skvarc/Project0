
class Server < Sinatra::Base 
    get "/" do 
        @people = File.read "people.json" 
        @people = JSON.parse(@people)
        slim :index 
    end 
    get "/game" do
        @people = File.read "people.json"
        @people = JSON.parse(@people)
        slim :game 
    end 
end



