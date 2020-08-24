
class Server < Sinatra::Base
    enable :sessions

    before do
        @error = session[:error]
        session.clear
    end

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

    get "/people" do       
       slim :people 
    end

    post "/people/new" do
        namn = params[:namn]
        bild = params[:bild]
        file_types = ['jpg', 'jpeg', 'gif', 'png']
        if !file_types.include?(bild[:filename].split(".").last)
            status 413
            session[:error] = "fel fil typ!" 
            redirect back
        end
        filename = SecureRandom.uuid + "." + bild[:filename].split(".").last 
        File.write("./Public/img/users/#{filename}", bild[:tempfile].read)
        datapeople = File.read("./people.json") 
        datapeople = JSON.parse(datapeople)
        p bild
        hash_data = {"name": namn, "img": filename}
        newhash = Hash[datapeople.length.to_s,  hash_data]
        datapeople.merge!(newhash) 
        File.write("people.json", datapeople.to_json)
        status 200
        redirect "/"
    end

    get '/people/delete/:id' do
        params[:id]
    
    end
end
