set :application, "chato"
set :repository,  "git@github.com:freshout-dev/chato.git"

set :deploy_to, "/home/deploy/chato"
set :scm, :git
ssh_options[:forward_agent] = true
default_run_options[:pty] = true
set :use_sudo, false
set :user, "deploy"
set :executable_file, "index.js"

role :app, "ec2-54-242-71-44.compute-1.amazonaws.com"

namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    begin
      run "cd #{release_path} && forever stop #{executable_file}"
    rescue
    end

    run "cd #{release_path} && forever start #{executable_file}"
  end
end

namespace :npm do
  task :create_symlink, :roles => :app do
    shared_dir = File.join(shared_path, 'node_modules')
    release_dir = File.join(current_release, 'node_modules')
    run("mkdir -p #{shared_dir} && ln -nfs #{shared_dir} #{release_dir}")
  end

  task :install, :roles => :app do
    npm.create_symlink
    shared_dir = File.join(shared_path, 'node_modules')
    run "cd #{release_path} && npm install"
  end
end


after "deploy:update_code" do
  npm.install
end
