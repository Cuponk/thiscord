json.messages do
    @messages.each do |message|
        json.set! message.id do
            json.extract! message, :id, :channel_id, :author_id, :body, :created_at, :updated_at
            json.author_name message.author.username
        end
    end
end