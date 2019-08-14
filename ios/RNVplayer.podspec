
Pod::Spec.new do |s|
  s.name         = "RNVplayer"
  s.version      = "0.0.1"
  s.summary      = "RNVplayer"
  s.description  = <<-DESC
                  Beautiful video player for react-native
                   DESC
  s.homepage     = ""
  s.license      = { :type => "MIT", :file => "LICENSE" }
  s.author             = { "author" => "waqqas.jabbar@gmail.com" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/waqqas/react-native-vplayer.git", :tag => "master" }
  s.source_files  = "RNVplayer/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

