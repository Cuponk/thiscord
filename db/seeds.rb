# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'faker'

ApplicationRecord.transaction do

    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Server.destroy_all
    Membership.destroy_all
    Message.destroy_all
    Channel.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('servers')
    ApplicationRecord.connection.reset_pk_sequence!('memberships')
    ApplicationRecord.connection.reset_pk_sequence!('channels')
    ApplicationRecord.connection.reset_pk_sequence!('messages')

    puts "Seeding users..."
    # Users
    User.create!(
        username: "derf6",
        email: "cuponk64@gmail.com",
        password: "password"
    )

    User.create!(
        username: "Cuponk",
        email: "demo@demo.com",
        password: "password"
    )

    15.times do
        User.create!(
            username: Faker::Internet.username(specifier: 3),
            email: Faker::Internet.email,
            password: "password"
        )
    end

    Server.create!(
        name: "Derf's Server",
        owner_id: 1
    )

    Membership.create!(
        membershipable_id: Server.last.id,
        membershipable_type: "Server",
        user_id: 1
    )

    

    15.times do |i|
        owner_id = rand(1..15)
        Server.create!(
            name: Faker::Fantasy::Tolkien.location,
            owner_id: owner_id
        )

        Membership.create!(
            membershipable_id: Server.last.id,
            membershipable_type: "Server",
            user_id: owner_id
        )
    end

    (1..15).to_a.each do |server_id|
        4.times do |i|
            Channel.create!(
                name: Faker::Fantasy::Tolkien.race,
                server_id: server_id
            )
        end
    end

    rand(1..3).times do
        Membership.all.each do |membership|
        user = User.find(membership.user_id)
        if membership.membershipable_type == 'Server'
            server = Server.find(membership.membershipable_id)
            channels = server.channels
            if channels.length > 0
            rand(1..5).times do
                channel = channels.sample
                    Message.create!({
                        author_id: user.id,
                        channel_id: channel.id,
                        body: Faker::Fantasy::Tolkien.poem
                    })
                end
                end
            end
        end
    end      
end