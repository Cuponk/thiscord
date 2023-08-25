json.server do 
    json.extract! @server, :id, :name, :owner_id
    json.photoUrl @server.photo.attached? ? @server.photo.url : nil
end
json.members do
    @server.users.each do |member|
        json.set! member.id do
            json.extract! member, :id, :username
        end
    end
end



