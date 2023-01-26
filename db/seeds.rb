# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


ItemCategory.destroy_all
Item.destroy_all
Location.destroy_all
Category.destroy_all
User.destroy_all

puts "🤞"

pablo = User.create(name: "Pablo Fuentes", email: "pablo@gmail.com", address: "123 One Rd. Baltimore, MD, 21212", password: "12345")
becki = User.create(name: "Becki V", email: "becki@gmail.com", address: "123 One Rd. Baltimore, MD, 21212", password: "12345")

kitchenware = Category.create(name: "Kitchenware")
bedbath = Category.create(name: "Bed and Bath")
office = Category.create(name: "Home Office")
tools = Category.create(name: "Tools and Hardware")
personalcare = Category.create(name: "Personal Care")
attire = Category.create(name: "Attire")
electronics = Category.create(name: "Electronics")
paperwork = Category.create(name: "Paperwork")
valuables = Category.create(name: "Valuables")
medicine = Category.create(name: "Medicine")
other = Category.create(name: "Other")

bedroom = Location.create(name: "Bedroom", user_id: pablo.id)  # add user_id
kitchen = Location.create(name: "Kitchen", user_id: becki.id)
basement = Location.create(name: "Basement", user_id: pablo.id)
living = Location.create(name: "Living Room", user_id: becki.id)

# add pictures & foreigh keys
passport = Item.create(name: "Passport", description:"blue small booklet", image_url: "https://www.cityoflamirada.org/home/showpublishedimage/6212/636885918927270000", location_in_room: "inside paper organizer on top shelf above filed taxes", user_id: pablo.id, location_id: basement.id)
controller = Item.create(name: "controller", description: "tv controller for family room", image_url: "https://www.lg.com/us/images/tv-audio-video-accessories/md05893656/gallery/1100-1.jpg", location_in_room: "between the couch cushins", user_id: becki.id, location_id: living.id)
ring = Item.create(name: "Ring", description: "grandmas wedding ring", image_url: "https://cdn.vox-cdn.com/thumbor/PHu0WROQVHQXZVmgEYCm-RpN2vE=/664x0:3840x1588/fit-in/1200x600/cdn.vox-cdn.com/uploads/chorus_asset/file/22905205/4k_fellowship_movie_screencaps.com_5395.jpg", location_in_room: "in bedroom safe", user_id: becki.id, location_id: bedroom.id)
passport = Item.create(name: "Baby pictures/Albums", description:"Collection of pictures", image_url: "https://images.mpix.com/ver/m2.5.0/551x551/products/photobooks/signaturecreatehc/slides/new-album-colors.mjpg", location_in_room: "inside box labeled pictures, bottom shelf", user_id: pablo.id, location_id: basement.id)
passport = Item.create(name: "Soccer Trophies", description:"1st place trophies", image_url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTNuITShEyKU73dGGrCo5zXkpLYW6qJns7awCYDppjPDNCYkofEvPcN0wPcpJzgcop2tHdhVNNxpLwMx2mKbiG7A9X0fjZFdZnQSHBIBewEEebeJEGCRuQg5Ck&usqp=CAE", location_in_room: "on shelf", user_id: pablo.id, location_id: living.id)
passport = Item.create(name: "Post Cards", description:"Collection of post cards from around the world", image_url: "https://i.etsystatic.com/8065618/r/il/a54d55/3189975922/il_fullxfull.3189975922_tq6t.jpg", location_in_room: "in sock drawer", user_id: pablo.id, location_id: bedroom.id)
passport = Item.create(name: "Spare Keys", description:"Extra set of keys", image_url: "https://gerstnerusa.com/wp-content/uploads/2020/04/1034replacementkeys.jpg", location_in_room: "inside paper organizer on top shelf above filed taxes", user_id: pablo.id, location_id: basement.id)
passport = Item.create(name: "Ramen", description:"the most delish thing ever", image_url: "https://m.media-amazon.com/images/I/91uMP0uU4HL._SX679_PIbundle-12,TopRight,0,0_AA679SH20_.jpg", location_in_room: "Shelf to the left of island", user_id: becki.id, location_id: kitchen.id)
passport = Item.create(name: "DSLR", description:"old camara from 2012", image_url: "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/sony_ilce7m3k_b_a7_iii_mirrorless_camera_1519677934_1394219.jpg", location_in_room: "Inside the tech drawer", user_id: becki.id, location_id: living.id)
passport = Item.create(name: "Art Sypply", description:"all of my art stuff", image_url: "https://kinderart.com/wp-content/uploads/art_supply_safety.jpg", location_in_room: "Behind recliner", user_id: pablo.id, location_id: bedroom.id)

ItemCategory.create(item_id: passport.id, category_id: paperwork.id)
ItemCategory.create(item_id: controller.id, category_id: electronics.id)
ItemCategory.create(item_id: ring.id, category_id: valuables.id)

puts "👍"