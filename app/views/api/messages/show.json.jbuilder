json.message do
    json.extract! @message, :id, :name, :server_id
end