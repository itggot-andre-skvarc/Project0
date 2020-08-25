
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
        hash_data = {"name": namn, "img": filename}
        newhash = Hash[datapeople.length.to_s,  hash_data]
        datapeople.merge!(newhash) 
        File.write("people.json", datapeople.to_json)
        status 200
        redirect "/"
    end

    get '/people/delete/:id' do
        params[:id]
        data = File.read 'people.json'
        data = JSON.parse(data)
        data.delete params[:id].to_s
        new_hash = {}

        data.each_with_index do |el, i|
            if el[0].to_i > params[:id].to_i
                x = i + 1
                new_hash[(x-1).to_s] = data.delete (x).to_s
            else
                new_hash[i.to_s] = data.delete (i).to_s
            end
        end

        File.write('people.json', new_hash.to_json)
        redirect '/'
    end

    post '/leaderboard/add' do
        data = File.read 'leaderboard.json'
        data = JSON.parse(data)
        data[params[:name]] = params[:result]
        File.write("leaderboard.json",data.to_json)
        redirect '/game'
    end

    get '/leaderboard/fetch' do
        data = File.read 'leaderboard.json'
        data = JSON.parse(data).to_json

    end
end
