json.servers do
    @servers.each do |server|
        json.set! server.id do
            json.extract! server, :id, :name, :owner_id
            json.photoUrl server.photo.attached? ? server.photo.url : nil
        end
    end
end