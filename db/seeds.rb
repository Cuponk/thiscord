ApplicationRecord.transaction do
    puts "Destroying tables..."
    Message.destroy_all
    Membership.destroy_all
    Channel.destroy_all
    Server.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('servers')
    ApplicationRecord.connection.reset_pk_sequence!('memberships')
    ApplicationRecord.connection.reset_pk_sequence!('channels')
    ApplicationRecord.connection.reset_pk_sequence!('messages')
  
    puts "Seeding users..."
    users = []
    user = User.create!(
        username: "DemoUser",
        email: "teset@test.com",
        password: "password"
    )
    user = User.create!(
      username: "Cuponk",
      email: "teset@test2.com",
      password: "password"
  )
    users << user
    29.times do  # Create 30 users
      user = User.create!(
        username: Faker::Internet.username(specifier: 3),
        email: Faker::Internet.email,
        password: "password"
      )
      users << user
    end
  
    puts "Seeding servers and memberships..."
    15.times do  # Create 15 servers
      owner = users.sample
      server = Server.create!(
        name: Faker::Fantasy::Tolkien.location,
        owner_id: owner.id
      )
  
      Membership.create!(
        membershipable_id: server.id,
        membershipable_type: "Server",
        user_id: owner.id
      )
  
      # Add 3 to 6 random users to each server
      members = users.sample(rand(3..6))
      members.each do |member|
        Membership.create!(
          membershipable_id: server.id,
          membershipable_type: "Server",
          user_id: member.id
        )
      end
  
      # Create 4 channels for each server
      4.times do
        Channel.create!(
          name: Faker::Fantasy::Tolkien.race,
          server_id: server.id
        )
      end
  
      # Create at least one message for each member in each channel of this server
      server.channels.each do |channel|
        members.each do |member|
          Message.create!({
            author_id: member.id,
            channel_id: channel.id,
            body: Faker::Fantasy::Tolkien.poem
          })
        end
      end
    end
  end
  