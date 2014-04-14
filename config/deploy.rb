require 'mina/git'

set :domain, 'nohm.eu'
set :user, 'nohm'
set :deploy_to, '/var/www/mkb_mina'
set :repository, 'git://github.com/nohm/mkb-almelo.git'
set :branch, 'master'

set :shared_paths, []

desc "Deploys the current version to the server."
task :deploy => :environment do
  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
  end
end
