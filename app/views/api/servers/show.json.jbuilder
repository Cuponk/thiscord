json.server do 
    json.extract! @server, :id, :name, :owner_id
    json.photoUrl @server.photo.attached? ? @server.photo.url : nil
end