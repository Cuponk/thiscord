json.array! @servers do |server|
    json.extract! server, :id, :name, :owner_id
end