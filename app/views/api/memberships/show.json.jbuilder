json.membership do
    json.extract! @membership, :id, :created_at, :user_id, :membershipable_id, :membershipable_type
end