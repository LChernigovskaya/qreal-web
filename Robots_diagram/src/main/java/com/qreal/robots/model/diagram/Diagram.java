package com.qreal.robots.model.diagram;

import com.qreal.robots.model.auth.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * Created by vladzx on 05.11.14.
 */
@Entity
@Table(name = "diagrams")
public class Diagram implements Serializable {

    @Id
    @Column(name = "diagram_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diagramId;

    @Column(name = "name")
    private String name;

    @Column(name = "node_index")
    private Long nodeIndex;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "username", nullable = false)
    private User creator;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "diagram_id", referencedColumnName = "diagram_id")
    private Set<DefaultDiagramNode> nodes;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "diagram_id", referencedColumnName = "diagram_id")
    private Set<Link> links;


    public User getCreator() {
        return this.creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public Long getDiagramId() {
        return diagramId;
    }

    public void setDiagramId(Long diagramId) {
        this.diagramId = diagramId;
    }

    public Long getNodeIndex() {
        return nodeIndex;
    }

    public void setNodeIndex(Long nodeIndex) {
        this.nodeIndex = nodeIndex;
    }

    public Set<DefaultDiagramNode> getNodes() {
        return nodes;
    }

    public Set<Link> getLinks() {
        return links;
    }

    public void setNodes(Set<DefaultDiagramNode> nodes) {
        this.nodes = nodes;
    }

    public void setLinks(Set<Link> links) {
        this.links = links;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
