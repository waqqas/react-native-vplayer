using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Vplayer.RNVplayer
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNVplayerModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNVplayerModule"/>.
        /// </summary>
        internal RNVplayerModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNVplayer";
            }
        }
    }
}
