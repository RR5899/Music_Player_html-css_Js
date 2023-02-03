Const MusicContainer = Document.GetElementById("Music-Container");
Const PlayBtn = Document.GetElementById("Play");
Const PrevBtn = Document.GetElementById("Prev");
Const NextBtn = Document.GetElementById("Next");
Const Audio = Document.GetElementById("Audio");
Const Progress = Document.GetElementById("Progress");
Const ProgressContainer = Document.GetElementById("Progress-Container");
Const Title = Document.GetElementById("Title");
Const Cover = Document.GetElementById("Cover");
// Songs Titles
Const Songs = ["Happyrock", "Jazzyfrenchy", "Ukulele"];
// KeepTrack Of Song
Let SongIndex = 0;
// Initially Load Song Details Into DOM
LoadSong(Songs[SongIndex]);
// Update Song Details
Function LoadSong(Song) {
Title.InnerText = Song;
Audio.Src = `./Music/${Song}.Mp3`;
Cover.Src = `./Images/${Song}.Jpg`;
}
// Play Song
Function PlaySong() {
MusicContainer.ClassList.Add("Play");
PlayBtn.QuerySelector("I.Fa").ClassList.Remove("Fa-Play");
PlayBtn.QuerySelector("I.Fa").ClassList.Add("Fa-Pause");
Audio.Play();
}
// Pause Song
Function PauseSong() {
MusicContainer.ClassList.Remove("Play");
PlayBtn.QuerySelector("I.Fa").ClassList.Add("Fa-Play");
PlayBtn.QuerySelector("I.Fa").ClassList.Remove("Fa-Pause");
Audio.Pause();
}
// Previous Song
Function PrevSong() {
SongIndex--;
If (SongIndex < 0) {
SongIndex = Songs.Length - 1;
}
LoadSong(Songs[SongIndex]);
PlaySong();
}
// Next Song
Function NextSong() {
SongIndex++;
If (SongIndex > Songs.Length - 1) {
SongIndex = 0;
}
LoadSong(Songs[SongIndex]);
PlaySong();
}
// Update Progress Bar
Function UpdateProgress(E) {
Const { Duration, CurrentTime } = E.SrcElement;
Const ProgressPerCent = (CurrentTime / Duration) * 100;
Progress.Style.Width = `${ProgressPerCent}%`;
}
// Set Progress
Function SetProgress(E) {
Const Width = This.ClientWidth;
Const ClickX = E.OffsetX;
Const Duration = Audio.Duration;
Audio.CurrentTime = (ClickX / Width) * Duration;
}
// Event Listeners
PlayBtn.AddEventListener("Click", () => {
Const IsPlaying = MusicContainer.ClassList.Contains("Play");
If (IsPlaying) {
PauseSong();
} Else {
PlaySong();
}
});
// Change Song
PrevBtn.AddEventListener("Click", PrevSong);
NextBtn.AddEventListener("Click", NextSong);
// Time/Song Update
Audio.AddEventListener("Timeupdate", UpdateProgress);
// Click On Progress Bar
ProgressContainer.AddEventListener("Click", SetProgress);
// Song End
Audio.AddEventListener("Ended", NextSong);
