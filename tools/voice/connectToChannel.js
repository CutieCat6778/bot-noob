const {
	entersState,
	VoiceConnectionStatus,
  joinVoiceChannel,
} = require('@discordjs/voice');
const createDiscordJSAdapter = require('./adapter');

module.exports = async (channel) => {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: createDiscordJSAdapter(channel)
  });

  /**
   * If we're dealing with a connection that isn't yet Ready, we can set a reasonable
   * time limit before giving up. In this example, we give the voice connection 30 seconds
   * to enter the ready state before giving up.
   */
  try {
    /**
     * Allow ourselves 30 seconds to join the voice channel. If we do not join within then,
     * an error is thrown.
     */
    /**
     * At this point, the voice connection is ready within 30 seconds! This means we can
     * start playing audio in the voice channel. We return the connection so it can be
     * used by the caller.
     */
    return connection;
  } catch (error) {
    /**
     * At this point, the voice connection has not entered the Ready state. We should make
     * sure to destroy it, and propagate the error by throwing it, so that the calling function
     * is aware that we failed to connect to the channel.
     */
    connection.destroy();
    throw error;
  }
}