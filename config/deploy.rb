require 'mina/git'

set :domain, 'nohm.eu'
set :user, 'nohm'
set :deploy_to, '/var/www/mkb_mina'
set :repository, 'git://github.com/nohm/mkb-almelo.git'
set :branch, 'master'

set :shared_paths, ['assets/vendor']

task :setup => :environment do
  queue! %[mkdir -p "#{deploy_to}/shared/vendor"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/vendor"]
end

desc "Deploys the current version to the server."
task :deploy => :environment do
  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
  end
end
