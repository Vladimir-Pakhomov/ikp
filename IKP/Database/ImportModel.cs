using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;

namespace MenuTreeComponent
{
    [DataContract(IsReference = true)]
    [KnownType(typeof(ConclusionComponent))]
    public class Node
    {
        [DataMember]
        public string ID { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public ObservableCollection<Node> ChildNodes { get; set; }

    }

    [DataContract]
    [KnownType(typeof(Question))]
    [KnownType(typeof(Conclusion))]
    public class Topic
    {
        [DataMember]
        public string Name { get; set; }


        [DataMember]
        public string GeneralQuestion { get; set; }

        /// <summary>
        /// Item1 - node ID, Item2 - parent node ID
        /// </summary>
        [DataMember]
        public ObservableCollection<Tuple<string, string>> NodeIDs { get; set; }

        [DataMember]
        public ObservableCollection<Question> Questions { get; set; }

        [DataMember]
        public Conclusion Conclusion { get; set; }
    }

    [DataContract]
    [KnownType(typeof(Resolver))]
    public class Question
    {
        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public ObservableCollection<Resolver> Resolvers { get; set; }
    }

    [DataContract]
    [KnownType(typeof(VisualContent))]
    [KnownType(typeof(TextResolver))]
    [KnownType(typeof(ImageResolver))]
    public abstract class Resolver
    {
        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public VisualContent VisualContent { get; set; }
    }

    [DataContract]
    public class TextResolver : Resolver
    {
        [DataMember]
        public string Content { get; set; }
    }

    [DataContract]
    public class ImageResolver : Resolver
    {
        [DataMember]
        public string ImageSrc { get; set; }

        [DataMember]
        public string FullImageSrc { get; set; }
    }

    [DataContract]
    [KnownType(typeof(VideoPair))]
    [KnownType(typeof(SingleVideo))]
    [KnownType(typeof(VideoVerdict))]
    public abstract class VisualContent
    {
        
    }

    [DataContract]
    public class VideoPair : VisualContent
    {
        [DataMember]
        public string correctSrc { get; set; }
        [DataMember]
        public string incorrectSrc { get; set; }
    }

    [DataContract]
    public class SingleVideo : VisualContent
    {
        [DataMember]
        public string Src { get; set; }
        [DataMember]
        public bool IsNormal { get; set; }
    }

    [DataContract(IsReference = true)]
    public class VerdictComponent : Node
    {

    }

    [DataContract(IsReference = true)]
    [KnownType(typeof(FinalComponent))]
    public class ConclusionComponent : Node
    {
        [DataMember]
        public bool IsCorrectSelection { get; set; }
    }

    // В целях поддержки обратной совместимости со старыми проектами
    [DataContract(IsReference = true)]
    public class FinalComponent : ConclusionComponent { }

    [DataContract]
    [KnownType(typeof(VerdictComponent))]
    public class VideoVerdict : VisualContent
    {
        [DataMember]
        public string Caption { get; set; }
        [DataMember]
        public VerdictComponent Root;
    }

    [DataContract]
    [KnownType(typeof(ConclusionComponent))]
    public class Conclusion
    {
        [DataMember]
        public string Caption { get; set; } // Заключение
        [DataMember]
        public ConclusionComponent Root;
    }

    [DataContract]
    [KnownType(typeof(Node))]
    [KnownType(typeof(Topic))]
    public class Project
    {
        [DataMember]
        public Node Root { get; set; }

        [DataMember]
        public string ShortName { get; set; }

        [DataMember]
        public ObservableCollection<Topic> Topics { get; set; }

        [DataMember]
        public string ServerAddress { get; set; }
    }
}
