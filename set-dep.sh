export dep="${1#*=}"
shift  # Remove the 'dep' argument
exec "$@"