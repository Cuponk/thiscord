# json.users do
#     @users.each do |user|
#         json.set! user.id do
#             json.extract! user, :id, :email, :username, :created_at, :updated_at
#         end
#     end
# end

@users.compact.each do |user|
    json.set! user.id do
        json.extract! user, :id, :email, :username, :created_at, :updated_at
    end
end
